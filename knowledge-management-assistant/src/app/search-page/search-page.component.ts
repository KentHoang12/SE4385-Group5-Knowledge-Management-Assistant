import { Component } from '@angular/core';
import { LmstudioService } from '../shared/services/lmstudio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import PocketBase from 'pocketbase';
import { BingsearchService } from '../shared/services/bingsearch.service';
import { WebsearchComponent } from '../websearch/websearch.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, WebsearchComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  userInput = '';
  chatResponses: Array<{ from: string; message: string }> = [];

  constructor(private lmstudioService: LmstudioService) {}

  formatMessage(message: string): string {
    // Replace **bold** with <strong> tags
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Bold numbered list items, indent number
    message = message.replace(/^(\d+\.\s)(.*)/gm, '<p class="numbered-item"><span class="number">$1</span><span class="text">$2</span></p>');
  
    // Convert list items (with asterisks) into block elements
    message = message.replace(/^\* (.*)/gm, '<p class="list-item">• $1</p>'); // Each list item on a new line
  
    return message;
  }
  
  ngOnInit() {
    const savedHistory = localStorage.getItem('chatHistory');
    if(savedHistory) {
      this.chatResponses = JSON.parse(savedHistory);
    }
  }
  getResponse() {
    if (this.userInput.trim()) {
      const input = this.userInput;
      this.chatResponses.push({ from: 'user', message: input });
      this.userInput = '';

      this.lmstudioService.getResponse(input).subscribe({
        next: (response: { choices: { message: { content: string } }[] }) => {
          // Extract and format the response from LLM
          if (response?.choices?.length > 0 && response.choices[0].message?.content) {
            let aiResponse = this.formatMessage(response.choices[0].message.content); // Format message
            this.chatResponses.push({ from: 'lmstudio', message: aiResponse });
            localStorage.setItem('chatHistory', JSON.stringify(this.chatResponses));
          } else {
            this.chatResponses.push({
              from: 'lmstudio',
              message: 'No valid response received from the LLM.',
            });
          }
        },
        error: (err) => {
          console.error('Error processing user input:', err);
          this.chatResponses.push({
            from: 'lmstudio',
            message: 'Error processing user input.',
          });
        },
      });

      

      localStorage.setItem('chatHistory', JSON.stringify(this.chatResponses));
    }
  }
  

  processSearchResults(searchResults: any): string[] {
    if (searchResults && searchResults.RelatedTopics) {
      // Map to an array of topic text, filtering out empty strings
      return searchResults.RelatedTopics.map(
        (topic: any) => topic.Text || ''
      ).filter((text: string) => text.trim() !== ''); // Remove empty results
    }
    return []; // Return an empty array if no results
  }
}

