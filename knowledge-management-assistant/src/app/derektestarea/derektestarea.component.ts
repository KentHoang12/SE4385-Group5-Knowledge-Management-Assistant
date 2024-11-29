import { Component } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';


const pb = new PocketBase('http://127.0.0.1:8090');

@Component({
  selector: 'app-derektestarea',
  standalone: true,
  imports: [],
  templateUrl: './derektestarea.component.html',
  styleUrl: './derektestarea.component.css'
})
export class DerektestareaComponent {
  async onClick() {
    const record = await pb.collection('queries').getOne('7zgt1zslmcqs05a', {
      expand: 'search_terms',
  });
    console.log(record);
  }
}
