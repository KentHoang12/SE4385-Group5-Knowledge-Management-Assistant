import { Component, OnInit } from '@angular/core';
import { ResponsesService } from '../responses.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  filterText: string = '';
  responses: any[] = [];

  constructor(private responsesService: ResponsesService) {}

  ngOnInit(): void {
    // Fetch data from the backend on initialization
    this.responsesService.getResponses().subscribe(
      data => (this.responses = data),
      error => console.error('Error fetching responses:', error)
    );
  }

  get filteredResponses() {
    return this.responses.filter(response =>
      response.text.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  goToNewPage() {
    window.location.href = '/new-page';
  }
}
