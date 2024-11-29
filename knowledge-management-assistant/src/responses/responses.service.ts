import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {
  // Replace this URL with the repository's backend URL if hosted remotely
  private apiUrl = 'http://localhost:5000/api/responses';

  constructor(private http: HttpClient) {}

  getResponses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
