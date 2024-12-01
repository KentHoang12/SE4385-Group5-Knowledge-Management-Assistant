import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LmstudioService {
  private apiUrl = 'http://127.0.0.1:1234/v1/chat/completions'; // Your LMStudio API endpoint

  constructor(private http: HttpClient) {}

  getResponse(prompt: string): Observable<any> {
    const body = {
      model: "llama-3.2-1b-instruct",
      messages: [
        {
          role: "user",
          content: prompt 
        }
      ],
      max_tokens: 400,
      temperature: 0.7,
    };
  
    return this.http.post(this.apiUrl, body);
  }
}
