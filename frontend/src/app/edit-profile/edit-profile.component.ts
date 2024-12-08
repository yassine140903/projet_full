import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user = {
    image: '',
    name: '',
    mail: '',
    phone: '',
    location: '',
  };

  errmsg = '';
  photo: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load user data from query params
    this.route.queryParamMap.subscribe((params) => {
      this.user.image = params.get('image') || '';
      this.user.name = params.get('name') || '';
      this.user.mail = params.get('mail') || '';
      this.user.phone = params.get('phone') || '';
      this.user.location = params.get('location') || '';
    });
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.photo = file;
      this.errmsg = '';
    } else {
      this.errmsg = 'Please select a valid image file.';
    }
  }

  verifInput() {
    const username = (
      document.getElementById('username') as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById('email') as HTMLInputElement
    ).value.trim();
    const phoneNumber = (
      document.getElementById('phoneNumber') as HTMLInputElement
    ).value.trim();
    const location = (
      document.getElementById('location') as HTMLInputElement
    ).value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^[0-9]{8}$/;

    let isValid = true;

    if (email && !emailRegex.test(email)) {
      this.showValidationError('email', 'Invalid email format!');
      isValid = false;
    } else {
      this.clearValidationError('email');
    }

    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      this.showValidationError('phoneNumber', 'Invalid phone number format!');
      isValid = false;
    } else {
      this.clearValidationError('phoneNumber');
    }

    if (location && location.length < 3) {
      this.showValidationError(
        'location',
        'Location must be at least 3 characters!'
      );
      isValid = false;
    } else {
      this.clearValidationError('location');
    }

    if (isValid) {
      const formData = new FormData();
      if (username) {
        formData.append('username', username);
      }
      if (email) {
        formData.append('email', email);
      }
      if (phoneNumber) {
        formData.append('phoneNumber', phoneNumber);
      }
      if (location) {
        formData.append('location', location);
      }
      if (this.photo) {
        formData.append('image', this.photo, this.photo.name);
      }
      console.log(formData);
      this.sharedService.updateme(formData).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('userData', JSON.stringify(response));
          window.dispatchEvent(new Event('navBarRefresh'));
          console.log('Update successful.');
          // this.router.navigate(['/profile']);
        },
        error: (err) => {
          alert(err?.error?.message);
          this.errmsg = err?.error?.message || 'An error occurred.';
        },
      });
    }
  }

  private showValidationError(fieldId: string, message: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      field.style.borderColor = 'red';
      field.placeholder = message;
    }
  }

  private clearValidationError(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      field.style.borderColor = '';
      field.placeholder = '';
    }
  }
}
