import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  verifInput() {
    const fullNameRegex = /^[a-zA-Z ]+$/;
    const phoneNumberRegex = /^[0-9]{8}$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]$/;
  
    // Validate fullName
    const fullName = document.getElementById("fullName") as HTMLInputElement;
    if (!fullName.value || !fullNameRegex.test(fullName.value)) {
      fullName?.style.setProperty("border-color", "red");
      fullName.placeholder = "fullName must contain only letters and spaces!";
    } else {
      fullName?.style.setProperty("border-color", "#000");
    }

    const phoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
    if (!phoneNumber.value || !phoneNumberRegex.test(phoneNumber.value)) {
      phoneNumber?.style.setProperty("border-color", "red");
      phoneNumber.placeholder = "8-digits!";
    } else {
      phoneNumber?.style.setProperty("border-color", "#000");
    }

    const email = document.getElementById("email") as HTMLInputElement;
    if (email.value && !emailRegex.test(email.value)) {
      email?.style.setProperty("border-color", "red");
      email.placeholder = "email must contain only letters and spaces!";
    } else {
      email?.style.setProperty("border-color", "#000");
    }

    const textArea = document.getElementById("textArea") as HTMLTextAreaElement;
    if (!textArea.value) {
      textArea?.style.setProperty("border-color", "red");
      textArea.placeholder = "Write your message here...";
    } else {
      textArea?.style.setProperty("border-color", "#000");
    }
  
    
  }
}
