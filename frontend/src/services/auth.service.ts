import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _isLoggedIn: boolean = false;

  constructor() {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(status: boolean) {
    this._isLoggedIn = status;
  }
}
