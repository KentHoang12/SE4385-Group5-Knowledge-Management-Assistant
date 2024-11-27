import { Component } from '@angular/core';
import { LmstudioService } from '../services/lmstudio.service';
import { DuckduckgoService } from '../services/duckduckgo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  userInput = '';
  chatResponses: Array<{ from: string; message: string }> = [];

  constructor(private lmstudioService: LmstudioService, private duckduckgoService: DuckduckgoService) {}
  
  getResponse() {
    if (this.userInput.trim()) {
      const input = this.userInput;
      this.chatResponses.push({ from: 'user', message: input });
      this.userInput = '';
  
      this.lmstudioService.getResponse(input).subscribe({
        next: (response: { choices: { message: { content: string } }[] }) => {
          // Extract response from LLM
          if (response?.choices?.length > 0 && response.choices[0].message?.content) {
            let aiResponse = response.choices[0].message.content.trim();
            this.chatResponses.push({ from: 'lmstudio', message: aiResponse });
          } else {
            this.chatResponses.push({
              from: 'lmstudio',
              message: 'No valid response received from the LLM.',
            });
          }
  
          //Search the web
          this.duckduckgoService.searchWeb(input).subscribe({
            next: (searchResults) => {
              const searchSummary = this.processSearchResults(searchResults);
  
              //Process web results with LMStudio
              this.lmstudioService.getResponse(searchSummary).subscribe({
                next: (processedResults) => {
                  if (processedResults?.choices?.length > 0 && processedResults.choices[0].message?.content) {
                    const finalResponse = processedResults.choices[0].message.content.trim();
                    this.chatResponses.push({
                      from: 'lmstudio',
                      message: `Processed Web Results: ${finalResponse}`,
                    });
                  } else {
                    this.chatResponses.push({
                      from: 'lmstudio',
                      message: 'No valid processed web results received from the LLM.',
                    });
                  }
                },
                error: (err) => {
                  console.error('Error processing web results:', err);
                  this.chatResponses.push({
                    from: 'lmstudio',
                    message: 'Error processing web results.',
                  });
                },
              });
            },
            error: (err) => {
              console.error('Error fetching web results:', err);
              this.chatResponses.push({
                from: 'lmstudio',
                message: 'Error fetching web results.',
              });
            },
          });
        },
        error: (err) => {
          console.error('Error processing user input:', err);
          this.chatResponses.push({
            from: 'lmstudio',
            message: 'Error processing user input.',
          });
        },
      });
    }
  }
  

  processSearchResults(searchResults: any): string {
    if (searchResults && searchResults.RelatedTopics) {
      return searchResults.RelatedTopics.map(
        (topic: any) => topic.Text || ''
      ).join('\n');
    }
    return 'No search results found.';
  }

}

