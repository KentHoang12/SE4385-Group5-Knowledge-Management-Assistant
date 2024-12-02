import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { LmstudioService } from '../shared/services/lmstudio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import PocketBase from 'pocketbase';
import { BingsearchService } from '../shared/services/bingsearch.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  userInput = '';
  chatResponses: Array<{ from: string; message: string }> = [];
  results = [];

  constructor(private lmstudioService: LmstudioService, private bingSearchService: BingsearchService) {}

  formatMessage(message: string): string {
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    message = message.replace(/^(\d+\.\s)(.*)/gm, '<p class="numbered-item"><span class="number">$1</span><span class="text">$2</span></p>');
    message = message.replace(/^\* (.*)/gm, '<p class="list-item">• $1</p>');
    return message;
  }
  
  addtohist(array: any) {
    return [{ from: "lmstudio", message:array["llmresponse"] }, { from: 'user', message: array["query"] }];
  }

  async ngOnInit() {
    const pb = new PocketBase(environment.baseUrl);
    const pbhist = await pb.collection('queries').getFullList({ user: pb.authStore.record?.id });
    this.chatResponses =  pbhist.map(this.addtohist).flat().reverse();
    
  }
  async getResponse() {
    const pb = new PocketBase(environment.baseUrl);

    if(!pb.authStore.isValid){return;}
    
    if (this.userInput.trim()) {
      const input = this.userInput;
      const collection = pb.collection('queries');
      this.chatResponses.push({ from: 'user', message: input });

      this.scrollToBottom();

      const apiResults = await this.bingSearchService.searchBing(this.userInput);
      this.userInput = '';
      this.scrollToBottom();

      this.results = apiResults.webPages?.value.map((item: any) => item.url) || [];

      this.lmstudioService.getResponse(input).subscribe({
        next: (response: { choices: { message: { content: string } }[] }) => {
          if (response?.choices?.length > 0 && response.choices[0].message?.content) {
            let aiResponse = this.formatMessage(response.choices[0].message.content);
            this.chatResponses.push({ from: 'lmstudio', message: aiResponse });
            collection.create({ query: input, response: apiResults, user: pb.authStore.record?.id, llmresponse: aiResponse });
          } else {
            this.chatResponses.push({
              from: 'lmstudio',
              message: 'No valid response received from the LLM.',
            });
            collection.create({ query: input, response: apiResults, user: pb.authStore.record?.id, llmresponse: 'No valid response received from the LLM.' });
          }
        },
        error: (err) => {
          console.error('Error processing user input:', err);
          this.chatResponses.push({
            from: 'lmstudio',
            message: 'Error processing user input.',
          });
          collection.create({ query: input, response: apiResults, user: pb.authStore.record?.id, llmresponse: 'Error processing user input.' });
        },
      });
      this.scrollToBottom();
    }
  }
  
  processSearchResults(searchResults: any): string[] {
    if (searchResults && searchResults.RelatedTopics) {
      return searchResults.RelatedTopics.map(
        (topic: any) => topic.Text || ''
      ).filter((text: string) => text.trim() !== '');
    }
    return [];
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollToBottom = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }
}

