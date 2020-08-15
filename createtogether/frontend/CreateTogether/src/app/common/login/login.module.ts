import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './otp/otp.component';
import { PasswordComponent } from './password/password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SupportComponent } from './support/support.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SharedModule } from "../../modules/shared/shared.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginAPIService } from './services/login.api.service';
import { LoginDataService } from './services/login.data.service';
import { UserProfileService } from '../home-layout/services/user.profile.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OtpComponent,
    PasswordComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SupportComponent,
    UpdateContactComponent,
    LoginLayoutComponent,
    VerifyOtpComponent,
  ],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [LoginService, LoginAPIService, LoginDataService, UserProfileService]

})
export class LoginModule { }
