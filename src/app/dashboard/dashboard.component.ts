import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit {
  subtitle: string;
  constructor(private cookieService: CookieService, private router: Router) {
    this.subtitle = 'This is some text within a card block.';
  }
  ngOnInit(): void {

    const rememberMe = this.getToken();
    if (rememberMe) {
    } else {
      this.router.navigate(['/users/login']);
    }

  }

  ngAfterViewInit() { }
  private getToken(): string {
    return localStorage.getItem('authToken') || "";
  }
}
