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
      console.log(input);
      this.userInput = '';

      // Step 1: Process user input using LMStudio
      this.lmstudioService.getResponse(input).subscribe({
        next: (response: { choices: { text: string; }[]; }) => {
          const aiResponse = response.choices[0].text.trim(); // Extract response
          this.chatResponses.push({ from: 'lmstudio', message: aiResponse });

          // Step 2: Search the web
          this.duckduckgoService.searchWeb(input).subscribe({
            next: (searchResults) => {
              const searchSummary = this.processSearchResults(searchResults);

              // Step 3: Process web results with LMStudio
              this.lmstudioService.getResponse(searchSummary).subscribe({
                next: (processedResults) => {
                  const finalResponse = processedResults.choices[0].text.trim();
                  this.chatResponses.push({
                    from: 'lmstudio',
                    message: `Processed Web Results: ${finalResponse}`,
                  });
                },
                error: (err) => {
                  this.chatResponses.push({
                    from: 'lmstudio',
                    message: 'Error processing web results.',
                  });
                },
              });
            },
            error: (err) => {
              this.chatResponses.push({
                from: 'lmstudio',
                message: 'Error fetching web results.',
              });
            },
          });
        },
        error: (err) => {
          this.chatResponses.push({
            from: 'lmstudio',
            message: 'Error processing user input.',
          });
        },
      });
    }
  }

  processSearchResults(searchResults: any): string {
    // Simplify or summarize search results for processing
    // Example with DuckDuckGo JSON structure:
    if (searchResults && searchResults.RelatedTopics) {
      return searchResults.RelatedTopics.map(
        (topic: any) => topic.Text || ''
      ).join('\n');
    }
    return 'No search results found.';
  }

}

