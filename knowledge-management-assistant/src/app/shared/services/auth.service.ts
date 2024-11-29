import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { UserModel } from '../../interfaces/user-model';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { isValidDate } from 'rxjs/internal/util/isDate';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  public async login(username: string, password: string): Promise<boolean> {
    const pb = new PocketBase(environment.baseUrl);
    const authData = await pb.collection('users').authWithPassword(username, password);

    this.userSubject.next( {isValid:pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token} );

    return pb.authStore.isValid;
  }

  public async logout(): Promise<void> {
    const pb = new PocketBase(environment.baseUrl);
    return await pb.authStore.clear();
  }

  public updateUserSubject(): void {
    const pb = new PocketBase(environment.baseUrl);
    this.userSubject.next( {isValid:pb.authStore.isValid, authModel: pb.authStore.model, token: pb.authStore.token} );  
  }

  
}
