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

  formatMessage(message: string): string {
    // Replace **bold** with <strong> tags
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Bold numbered list items, indent number
    message = message.replace(/^(\d+\.\s)(.*)/gm, '<p class="numbered-item"><span class="number">$1</span><span class="text">$2</span></p>');
  
    // Convert list items (with asterisks) into block elements
    message = message.replace(/^\* (.*)/gm, '<p class="list-item">• $1</p>'); // Each list item on a new line
  
    return message;
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
          } else {
            this.chatResponses.push({
              from: 'lmstudio',
              message: 'No valid response received from the LLM.',
            });
          }

          // Search the web
          this.duckduckgoService.searchWeb(input).subscribe({
            next: (searchResults) => {
              try {
                if (searchResults && searchResults.RelatedTopics) {
                  const topLinks = searchResults.RelatedTopics.slice(0, 5).map(
                    (topic: any) => topic.FirstURL || null
                  );

                  const hyperlinkList = topLinks
                    .filter((url: any) => url) 
                    .map((url: any) => `<a href="${url}" target="_blank">${url}</a>`)
                    .join('<br>');

                  // Format hyperlinks dynamically
                  const formattedLinks = this.formatMessage(`Top 5 Links:<br>${hyperlinkList}`);

                  this.chatResponses.push({
                    from: 'lmstudio',
                    message: formattedLinks,
                  });
                } else {
                  this.chatResponses.push({
                    from: 'lmstudio',
                    message: 'No search results found.',
                  });
                }
              } catch (error) {
                console.error('Error while extracting search results:', error);
                this.chatResponses.push({
                  from: 'lmstudio',
                  message: 'Error while extracting search results.',
                });
              }
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

