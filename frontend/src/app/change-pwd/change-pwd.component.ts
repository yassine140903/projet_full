import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrl: './change-pwd.component.css',
})
export class ChangePwdComponent {
  user = {
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  };

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  changePwd() {
    let ok = true;
    const passwordCurrent = document.getElementById(
      'passwordCurrent'
    ) as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const passwordConfirm = document.getElementById(
      'passwordConfirm'
    ) as HTMLInputElement;

    //curr password check (lezma requete) ok = false; ;
    if (password.value.length < 4) {
      password.style.borderColor = password.style.color = 'red';
      ok = false;
    } else password.style.borderColor = password.style.color = '';

    if (passwordConfirm.value != password.value) {
      passwordConfirm.style.borderColor = passwordConfirm.style.color = 'red';
      ok = false;
    } else passwordConfirm.style.borderColor = passwordConfirm.style.color = '';

    if (ok) {
      console.log(this.user);
      this.sharedService.updatemyPassword(this.user).subscribe({
        next: () => {
          //this.router.navigate(['/profile']);
          console.log('nomallement pwd changed.');
        },
        error: (err) => {
          alert(err?.error?.message);
        },
      });
    }
  }
}
