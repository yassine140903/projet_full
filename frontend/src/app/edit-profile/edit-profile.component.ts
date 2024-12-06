import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  inputs: ['userData'],
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit  {
  image!: String;
  name!: String;
  mail!: String;
  phone!: String;
  location!: String;
  user = {
    image: '',
    name: '',
    mail: '',
    phone: '',
    location: ''
  };

  constructor(private route: ActivatedRoute, private sharedService : SharedService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.user.image = params.get('image') || '';
      this.user.name = params.get('name') || '';
      this.user.mail = params.get('mail') || '';
      this.user.phone = params.get('phone') || '';
      this.user.location = params.get('location') || '';
    });
  }

  updateUser(){
    
  }
}

