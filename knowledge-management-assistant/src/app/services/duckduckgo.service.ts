import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuckduckgoService {

  constructor(private http: HttpClient) { }

  searchWeb(query: string): Observable<any> {
    const apiKey = 'b64eb398c53b0b28b184f4f6c73a5667f80f651c4235fb14af45be07abe5abd5'; // Replace with your actual SerpAPI key
    const searchUrl = `https://serpapi.com/search`; // Base URL for SerpAPI
    
    // Set query parameters
    const params = {
      q: query, // The search query
      api_key: apiKey, // Your API key
      engine: 'google', // Specify the search engine (e.g., 'google')
      num: 10 // Number of results to fetch (optional)
    };
  
    // Make the HTTP GET request
    return this.http.get(searchUrl, { params });
  }
  
}
