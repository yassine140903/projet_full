import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../app/user.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileDataPassService{
    private profileSource = new BehaviorSubject<User | null>(null);
    currentUser = this.profileSource.asObservable();

  constructor() {}

  // Set the article data to the service
  setProfile(user: User) {
    this.profileSource.next(user);
  }
}