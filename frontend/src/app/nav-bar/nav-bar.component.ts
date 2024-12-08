import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(public router: Router, public authService: AuthService) {}

  user: User = {
    _id: 'default',
    username: 'Guest',
    email: '',
    image: 'assets/images/profile.png',
    phoneNumber: '',
    location: '',
    posts: [],
    role: 'guest',
    createdAt: '',
    updatedAt: '',
    isLoggedIn: false,
  };

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    try {
      this.user = userData ? (JSON.parse(userData) as User) : this.user;
    } catch (error) {
      console.error('Failed to parse userData from localStorage:', error);
    }
    window.addEventListener('navBarRefresh', () => this.ngOnInit());
  }

  onProfileClick(user: User) {
    this.router.navigate(['/profile', user._id]);
  }

  goToAddArticle() {
    if (this.authService._isLoggedIn) this.router.navigate(['/addArticle']);
    else alert('Login First!!');
  }

  goToLogin() {
    if (this.router.url == '/addArticle' && this.authService._isLoggedIn)
      this.router.navigate(['/']);
    else this.router.navigate(['/login']);
  }
}
