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
    const username = (document.getElementById('username') as HTMLInputElement)
      .value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phoneNumber = (
      document.getElementById('phoneNumber') as HTMLInputElement
    ).value.trim();
    const location = (
      document.getElementById('location') as HTMLInputElement
    ).value.trim();

    const usernameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^[0-9]{8}$/;

    let isValid = true;

    if (!usernameRegex.test(username)) {
      this.showValidationError('username', 'Only letters and spaces allowed!');
      isValid = false;
    } else {
      this.clearValidationError('username');
    }

    if (!emailRegex.test(email)) {
      this.showValidationError('email', 'Invalid email format!');
      isValid = false;
    } else {
      this.clearValidationError('email');
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      this.showValidationError('phoneNumber', 'Phone must be 8 digits!');
      isValid = false;
    } else {
      this.clearValidationError('phoneNumber');
    }

    if (location.length < 3) {
      this.showValidationError('location', 'Location must be at least 3 characters!');
      isValid = false;
    } else {
      this.clearValidationError('location');
    }

    if (isValid) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('location', location);

      // if (this.photo) {
      //   formData.append('image', this.photo, this.photo.name);
      // }

      this.sharedService.updateme(formData).subscribe({
        next: () => {
          //this.router.navigate(['/profile']);
          console.log("nomallement sar l update.");
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
