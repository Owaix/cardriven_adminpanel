import { Input, Component, OnInit } from '@angular/core';
import { User } from '../../services/Users';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngbd-alert',
  templateUrl: './profiles.component.html'
})

export class ProfilesComponent implements OnInit {

  fileBase64: string = '';  // Variable to store the Base64 string
  img: string = '';
  user: User = new User();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.get_profile().subscribe(
      response => {
        let user = response.userData[0];
        console.log(user);
        this.user.email = user.email;
        this.user.phone = user.phone_no;
        this.user.address = user.address;
        this.user.name = user.name;
        this.img = user.profile_img;
      },
      error => {
        alert(error.error.message);
      }
    );
    // let user = JSON.parse(localStorage.getItem("user") ?? "");   
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {

    if (!this.user.name || !this.user.phone) {
      alert('Name and phone number are required.');
      return;
    }

    this.user.image = this.fileBase64;
    if (this.user.image == '') {
      this.user.isImage = false
    } else {
      this.user.isImage = true
    }

    this.userService.update_profile(this.user).subscribe(
      response => {
        alert(response.message)
        this.router.navigate(['/component/profile']);
      },
      error => {
        alert(error.error.message);
      }
    );
  }
}