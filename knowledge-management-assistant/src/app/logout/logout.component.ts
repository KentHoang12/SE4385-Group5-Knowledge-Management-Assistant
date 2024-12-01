import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  auth: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.auth.logout().then(() => {
      this.auth.updateUserSubject();
      this.router.navigateByUrl('/');
    });
  }
}
