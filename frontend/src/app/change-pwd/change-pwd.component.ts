import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrl: './change-pwd.component.css'
})
export class ChangePwdComponent {

  user = {
    currpwd : "",
    newpwd : "",
    confpwd : "",
  };

  constructor(private route: ActivatedRoute, private sharedService : SharedService) {}

  ngOnInit(): void {}

  changePwd(){
    let ok = true;
    const currpwd = document.getElementById("currpwd") as HTMLInputElement;
    const newpwd = document.getElementById("newpwd") as HTMLInputElement;
    const confpwd = document.getElementById("confpwd") as HTMLInputElement;

    //curr password check (lezma requete) ok = false; ;
    if(newpwd.value.length < 4){
      newpwd.style.borderColor = newpwd.style.color =  "red";
      ok = false;
    }else newpwd.style.borderColor = newpwd.style.color = "";

    if(confpwd.value != newpwd.value){
      confpwd.style.borderColor = confpwd.style.color = "red";
      ok = false;
    }else confpwd.style.borderColor = confpwd.style.color = "";

    if(ok){
      this.sharedService.updatemyPassword(this.user).subscribe({
        next: () => {
          //this.router.navigate(['/profile']);
          console.log("nomallement pwd changed.");
        },
        error: (err) => {
          alert(err?.error?.message);
        },
      })
    }

  }
}
