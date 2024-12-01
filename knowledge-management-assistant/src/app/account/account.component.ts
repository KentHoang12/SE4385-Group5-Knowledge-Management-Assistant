import { Component, inject, OnInit } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  private pb: PocketBase;
  public user: any;
  public userpfp: any;
  auth: AuthService = inject(AuthService);

  constructor() {
    this.pb = new PocketBase(environment.baseUrl);
  }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    this.user = await this.auth.getUserObj();
    this.userpfp = this.pb.files.getURL(this.user.record,this.user.record['avatar'])
  }
  
  
}
