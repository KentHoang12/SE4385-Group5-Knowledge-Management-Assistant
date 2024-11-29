import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NgModule } from '@angular/core';
import { LoginpbComponent } from './loginpb/loginpb.component';
import { LogoutComponent } from './logout/logout.component';



export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginpbComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: SearchPageComponent },
  { path: 'logout', component: LogoutComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
