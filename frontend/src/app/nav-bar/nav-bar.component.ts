import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {  
  constructor(public router: Router, public authService: AuthService) {}


  user : User = {
    _id : "67446dafbfd0dbdd63e5b567",
    username : 'mhbxii',
    email : 'mhbxii@gmail.com',
    image : "assets/images/profilepic.png",
    phoneNumber : "+21624644429",
    location : "Kebili",
    posts : [],
    role : 'user',
    createdAt : "haha",
    updatedAt: "hhhh",
    isLoggedIn : false,
  };
  

  onProfileClick(user: User) {
    this.router.navigate(['/profile', user._id]);
  }

  goToAddArticle(){
    if(this.authService._isLoggedIn)
      this.router.navigate(["/addArticle"]);
    else alert("Login First!!");
  }

  goToLogin(){
    if(this.router.url == '/addArticle' && this.authService._isLoggedIn)
      this.router.navigate(["/"]);
    else
      this.router.navigate(["/login"]);
  }

}
  
