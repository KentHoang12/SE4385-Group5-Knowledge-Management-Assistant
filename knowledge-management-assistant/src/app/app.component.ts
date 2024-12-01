import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginpbComponent } from './loginpb/loginpb.component';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
import { UserModel } from './interfaces/user-model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchPageComponent, RouterModule, HttpClientModule, RouterLink, LoginpbComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'knowledge-management-assistant';

  auth: AuthService = inject(AuthService);
  
  isLoggedIn:boolean = false;
  loggedInStatusSub?: Subscription;

  ngOnInit(): void {
    this.auth.updateUserSubject();
    this.loggedInStatusSub = this.auth.user$.subscribe((res: UserModel | null) => {
      if(res === null){
        this.isLoggedIn = false;
      } else if (localStorage.getItem('pocketbase_auth') !== null){
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }   
    });
  }

  ngOnDestroy(): void {
    this.loggedInStatusSub?.unsubscribe();
  }
}
