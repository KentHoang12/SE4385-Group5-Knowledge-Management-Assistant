import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuckduckgoService {

  constructor(private http: HttpClient) { }

  searchWeb(query: string): Observable<any> {
    const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
    return this.http.get(searchUrl);
  }
}
