import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router){}
  verifInput(){
    let ok = true;
    const NameRegex = /^[a-zA-Z ]+$/;
    const phoneNumberRegex = /^[0-9]{8}$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/;
    const locationRegex = /^[a-zA-Z]+[0-9]*$/;

    const firstName = document.getElementById("firstName") as HTMLInputElement;
    if (!firstName.value || !NameRegex.test(firstName.value)) {
      firstName?.style.setProperty("border-color", "red");
      firstName.placeholder = "firstName must contain only letters and spaces!";
      ok = false;
    } else {
      firstName?.style.setProperty("border-color", "#000");
    }

    const lastName = document.getElementById("lastName") as HTMLInputElement;
    if (!lastName.value || !NameRegex.test(lastName.value)) {
      lastName?.style.setProperty("border-color", "red");
      lastName.placeholder = "lastName must contain only letters and spaces!";
      ok = false;
    } else {
      lastName?.style.setProperty("border-color", "#000");
    }

    const email = document.getElementById("email") as HTMLInputElement;
    if (!email.value || !emailRegex.test(email.value)) {
      email?.style.setProperty("border-color", "red");
      email.placeholder = "email is not valid!";
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

    const confpwd = document.getElementById("confpwd") as HTMLInputElement;
    if ((!confpwd.value) || (confpwd.value != pwd.value)) {
      confpwd?.style.setProperty("border-color", "red");
      confpwd.placeholder = "incorrect!";
      ok = false;
    } else {
      confpwd?.style.setProperty("border-color", "#000");
    }

    const phoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    if (!phoneNumber.value || !phoneNumberRegex.test(phoneNumber.value)) {
      phoneNumber?.style.setProperty("border-color", "red");
      phoneNumber.placeholder = "phone must be 8-digits!";
      ok = false;
    } else {
      phoneNumber?.style.setProperty("border-color", "#000");
    }

    const location = document.getElementById("location") as HTMLInputElement;
    if (!location.value || !locationRegex.test(location.value)) {
      location?.style.setProperty("border-color", "red");
      location.placeholder = "invalid location!";
      ok = false;
    } else {
      location?.style.setProperty("border-color", "#000");
    }
    
    
    if(ok){
      //Add account to DB;
      this.router.navigate(["/login"]);
    }
  }
}
