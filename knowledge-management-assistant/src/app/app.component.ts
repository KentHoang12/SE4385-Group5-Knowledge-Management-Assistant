import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchPageComponent, LoginComponent, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'knowledge-management-assistant';
}
