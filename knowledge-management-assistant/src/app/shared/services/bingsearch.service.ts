import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BingsearchService {
  private apiurl = 'https://api.bing.microsoft.com/v7.0/search'
  

  
  constructor(private httpclient: HttpClient) {  }

  async searchBing(query: string): Promise<any> {
    const pb = new PocketBase(environment.baseUrl);
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': environment.azurekey
    });
    const params = {
      q: query,
      mkt: 'en-US',
      count: 3,
      offset: 0,
      safeSearch: 'Moderate' 
    }
    try {
      const response = await this.httpclient.get(this.apiurl, { headers, params }).toPromise();

      let collection = pb.collection('queries');
      collection.create({ query: query, response: response });

      return response;
    } catch (error) {
      console.error('Error fetching data from Bing Search API:', error);
      throw error;
    }
    
    
    
    
  
  }
}
