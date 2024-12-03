import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  inputs: ['userData'],
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit  {
  user = {
    image: '',
    name: '',
    mail: '',
    phone: '',
    location: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.user.image = params.get('image') || '';
      this.user.name = params.get('name') || '';
      this.user.mail = params.get('mail') || '';
      this.user.phone = params.get('phone') || '';
      this.user.location = params.get('location') || '';
    });
  }
}

