import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent, // Root component
    LoginComponent,
    SearchPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add this for ngModel
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent], // Entry point
})
export class AppModule {}