import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { NavbarAuthComponent } from './navbar-auth/navbar-auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    NavbarAuthComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
