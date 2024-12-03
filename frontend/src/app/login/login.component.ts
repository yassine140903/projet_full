
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private router :Router, private authService: AuthService){}

  
  
  
  
  
  
  
  
  
  
  
  
  
  
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
      this.router.navigate([""]);
      this.authService.isLoggedIn = true;
    }
  }



    
  ngOnInit(): void {

    };

}
