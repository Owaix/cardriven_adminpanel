import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { User } from '../../services/Users';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: User = new User();
  rememberMe = false;
  constructor(private loginService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    //this.cookieService.set('rememberMe', "343434", 30);
    const rememberMe = this.cookieService.get('rememberMe');
    if (rememberMe) {
      //this.router.navigate(['/dashboard']);
    }
  }

  checkChanged(event: any) {
    this.rememberMe = event.target.checked;
  }

  onLogin() {
    this.loginService.login(this.user).subscribe(
      response => {
        console.log(response)

        if (this.rememberMe) {
          this.cookieService.set('rememberMe', response.id, 30);
        } else {
          this.cookieService.delete('rememberMe');
        }

        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("name", response.name);
        localStorage.setItem("id", response.id);
        localStorage.setItem("authToken", response.auth_token);
        localStorage.setItem("profile_img", response.profile_img);
        localStorage.setItem("email", response.email);
        //Ziawospmahc@1
        this.router.navigate(['/dashboard']);
      },
      error => {
        alert(error.error.message);
      }
    );
  }
}
