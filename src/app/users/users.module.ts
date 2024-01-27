import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { UsersRoutes } from "./users.routing";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    NgApexchartsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
})
export class UsersModule { }
