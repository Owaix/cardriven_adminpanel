import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/Users';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  passwordConfirmation: string = '';
  user: User = new User();
  passwordIsValid = true; // A flag to indicate if the password is valid

  constructor(private userService: UserService, private router: Router) { }

  validatePassword() {
    const { password } = this.user;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    this.passwordIsValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return this.passwordIsValid;
  }

  registerUser() {
    if (this.validatePassword()) {
      if (this.user.password === this.passwordConfirmation) {
        this.userService.register(this.user).subscribe(
          response => {
            alert(response.message);
            this.router.navigate(['/users/login']);
          },
          error => {
            alert(error.error.message);
          }
        );
      } else {
        alert('Passwords do not match!');
      }
    } else {

    }
  }
}
