// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _isLoggedIn: boolean = true;

  constructor(private sharedService : SharedService) {}

  private saveToken(token: string): void {
    const decodedToken: any = jwtDecode(token); 
    const expires = new Date(decodedToken.exp * 1000); 
    document.cookie = `jwt=${token}; expires=${expires.toUTCString()}; path=/`;
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
      return localStorage.getItem('jwt');
    return '';
  }

  get isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }
  
}