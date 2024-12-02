import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { LoginpbComponent } from './loginpb/loginpb.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';



export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginpbComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent },
];

