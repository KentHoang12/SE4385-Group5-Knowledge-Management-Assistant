import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}

  performSearch() {
    if (!this.query) {
      this.error = 'Please enter a search query';
      return;
    }

    this.error = '';
    this.results = [];

    const apiKey = 'your_serpapi_key'; // Replace with your SerpAPI key
    const url = 'https://serpapi.com/search';

    const params = {
      q: this.query,
      engine: 'duckduckgo',
      api_key: apiKey
    };

    this.http.get(url, { params }).subscribe(
      (response: any) => {
        this.results = response.organic_results || [];
      },
      (err) => {
        this.error = 'An error occurred while fetching results.';
        console.error(err);
      }
    );
  }
}
