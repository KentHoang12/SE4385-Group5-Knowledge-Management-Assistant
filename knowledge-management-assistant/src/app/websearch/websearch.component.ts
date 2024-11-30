import { Component, Input, OnInit } from '@angular/core';
import { BingsearchService } from '../shared/services/bingsearch.service';

@Component({
  selector: 'app-websearch',
  standalone: true,
  imports: [],
  templateUrl: './websearch.component.html',
  styleUrl: './websearch.component.css'
})
export class WebsearchComponent implements OnInit {
  public results: any[] = [];
  @Input() input: string = '';

  constructor(private bingsearchService: BingsearchService) {}
  
  ngOnInit(): void {
    if (this.input) {
      console.log('Searching Bing for:', this.input);
      this.searchBing(this.input);
    }
  }

  async searchBing(query: string) {
    try {
      this.results = await this.bingsearchService.searchBing(query);
      return this.results;
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    return [];
  }
}
