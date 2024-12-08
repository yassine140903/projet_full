import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
// Adjust the import path as needed

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'], // Corrected property name
})
export class ContactComponent {
  constructor(private sharedService: SharedService) {} // Inject the shared service

  verifInput() {
    const fullNameRegex = /^[a-zA-Z ]+$/;
    const phoneNumberRegex = /^[0-9]{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate fullName
    const fullName = document.getElementById('fullName') as HTMLInputElement;
    if (!fullName.value || !fullNameRegex.test(fullName.value)) {
      fullName?.style.setProperty('border-color', 'red');
      fullName.placeholder = 'fullName must contain only letters and spaces!';
    } else {
      fullName?.style.setProperty('border-color', '#000');
    }

    const phoneNumber = document.getElementById(
      'phoneNumber'
    ) as HTMLInputElement;
    if (!phoneNumber.value || !phoneNumberRegex.test(phoneNumber.value)) {
      phoneNumber?.style.setProperty('border-color', 'red');
      phoneNumber.placeholder = '8-digits!';
    } else {
      phoneNumber?.style.setProperty('border-color', '#000');
    }

    const email = document.getElementById('email') as HTMLInputElement;
    if (email.value && !emailRegex.test(email.value)) {
      email?.style.setProperty('border-color', 'red');
      email.placeholder = 'email must contain only letters and spaces!';
    } else {
      email?.style.setProperty('border-color', '#000');
    }

    const textArea = document.getElementById('textArea') as HTMLTextAreaElement;
    if (!textArea.value) {
      textArea?.style.setProperty('border-color', 'red');
      textArea.placeholder = 'Write your message here...';
    } else {
      textArea?.style.setProperty('border-color', '#000');
    }

    const dataContact = {
      name: fullName.value,
      email: email.value,
      number: phoneNumber.value,
      message: textArea.value,
    };

    this.sharedService.sendContact(dataContact).subscribe({
      next: (res: any) => {
        console.log('Contact message sent successfully:', res);
        alert('Your message has been sent successfully!');
      },
      error: (err: any) => {
        console.error('Error sending contact message:', err);
        alert(
          'There was an error sending your message. Please try again later.'
        );
      },
    });
  }
}
