import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPageComponent } from '../search-page/search-page.component';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpb',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPageComponent],
  templateUrl: './loginpb.component.html',
  styleUrl: './loginpb.component.css'
})
export class LoginpbComponent {

  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  username:string = '';
  password:string = '';
  errorMessage:boolean = false;

  login() {
    this.auth.login(this.username, this.password)
    .then((res:boolean) => {  
      if(res){
        this.router.navigateByUrl('/search')
      }  
    }, (res:null) => this.errorMessage = true);
  } 

}
