import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,
  {
    providers: [HttpClientModule, provideHttpClient(), provideRouter(routes)],
  }
)
  .catch((err) => console.error(err));
