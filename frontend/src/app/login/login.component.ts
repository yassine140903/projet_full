
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private router :Router, private authService: AuthService, private sharedService : SharedService){}
  
  
  verifInput(){
    let ok = true;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/;

    const email = document.getElementById("email") as HTMLInputElement;
    if (!email.value || !emailRegex.test(email.value)) {
      email?.style.setProperty("border-color", "red");
      email.placeholder = "email must contain only letters and spaces!";
      ok = false;
    } else {
      email?.style.setProperty("border-color", "#000");
    }

    const pwd = document.getElementById("pwd") as HTMLInputElement;
    if (!pwd.value) {
      pwd?.style.setProperty("border-color", "red");
      pwd.placeholder = "pwd must not be empty!";
      ok = false;
    } else {
      pwd?.style.setProperty("border-color", "#000");
    }

    if(ok){   
      this.authService.login(this.credentials).subscribe({
        next: (response: any) => {
          if(response.status == "success"){
            localStorage.setItem('token', response.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            this.authService._isLoggedIn = true;
            this.router.navigate(['']);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed: ' + (err.error.message || 'Unknown error'));
        }
    });
  }
}
  

  onForgotPassword() {
    if(!this.credentials.email) {
      alert('Please enter your email!');
      return;
    }

    this.sharedService.forgotPassword(this.credentials.email).subscribe({
      next: (response) => {
        alert('Password reset link sent to your email.');
        console.log(response);
      },
      error: (err) => {
        console.error('Error sending reset link:', err);
        alert('There was an error. Please try again later.');
      },
    });}
  
    
  ngOnInit(): void {};

}
