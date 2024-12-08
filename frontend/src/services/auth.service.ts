// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private sharedService: SharedService) {}

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  signup(userData: any): Observable<any> {
    return this.sharedService.signupuser(userData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.sharedService.signinuser(credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined')
      return localStorage.getItem('token');
    return '';
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();
    console.log('Token: from loggedIn Getter HAHA', token);
    if (!token) {
      return false;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  }
  public _isLoggedIn: boolean = this.isLoggedIn;

  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn = false;
  }
}
