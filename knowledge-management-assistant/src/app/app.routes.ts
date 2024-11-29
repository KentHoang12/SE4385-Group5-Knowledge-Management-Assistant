import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NgModule } from '@angular/core';
import { DerektestareaComponent } from './derektestarea/derektestarea.component';



export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: SearchPageComponent },
  { path: 'derektestarea', component: DerektestareaComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
