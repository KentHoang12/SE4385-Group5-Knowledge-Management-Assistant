import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // if username and password is "admin", pass 
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login

    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}