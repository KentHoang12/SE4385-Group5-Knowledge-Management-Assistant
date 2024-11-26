import { Component } from '@angular/core';
import { LmstudioService } from '../services/lmstudio.service';
import { DuckduckgoService } from '../services/duckduckgo.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  userInput = '';
  chatResponses: Array<{ from: string; message: string }> = [];

  constructor(private lmstudioService: LmstudioService, private duckduckgoService: DuckduckgoService) {}

  getResponse() {
    console.log('hello');
    if (this.userInput.trim()) {
      const input = this.userInput;
      this.chatResponses.push({ from: 'user', message: input });
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
