import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent {

  credentials = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    location: '',
  };

  constructor(private http: HttpClient, private router: Router , private authService: AuthService){}
  
  verifInput(): boolean {
    let ok = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    const email = document.getElementById('email') as HTMLInputElement;
    const username = document.getElementById('firstName') as HTMLInputElement;
    const pwd = document.getElementById('pwd') as HTMLInputElement;
    const pwdConfirm = document.getElementById('confpwd') as HTMLInputElement;
  
    if (!username.value) {
      username.style.setProperty('border-color', 'red');
      username.placeholder = 'Username must not be empty!';
      ok = false;
    } else {
      username.style.setProperty('border-color', '#000');
    }
  
    if (!email.value || !emailRegex.test(email.value)) {
      email.style.setProperty('border-color', 'red');
      email.placeholder = 'Invalid email format!';
      ok = false;
    } else {
      email.style.setProperty('border-color', '#000');
    }
  
    if (!pwd.value) {
      pwd.style.setProperty('border-color', 'red');
      pwd.placeholder = 'Password must not be empty!';
      ok = false;
    } else {
      pwd.style.setProperty('border-color', '#000');
    }
  
    if (pwd.value !== pwdConfirm.value) {
      pwdConfirm.style.setProperty('border-color', 'red');
      pwdConfirm.placeholder = 'Passwords do not match!';
      ok = false;
    } else {
      pwdConfirm.style.setProperty('border-color', '#000');
    }
  
    return ok;
  }
  

  onSignup() {
    if (this.verifInput()) {
      console.log('Sending credentials:', this.credentials);
      if (!this.credentials.username || !this.credentials.email || !this.credentials.password || !this.credentials.passwordConfirm) {
        alert('Please fill in all required fields.');
        return;
      }

      this.authService.signup(this.credentials).subscribe({
        next: (response: any) => {
          console.log('Signup successful:', response);
          localStorage.setItem('token', response.token); 
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Signup failed:', err);
          alert('Signup failed: ' + (err.error.message || 'Unknown error'));
        }
      });
    }
  }
  
}
