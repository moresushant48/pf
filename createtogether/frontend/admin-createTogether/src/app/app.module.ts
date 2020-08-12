import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { STATES } from './store';
import { ForgotPasswordComponent } from './common/login/forgot-password/forgot-password.component';
import { LoginLayoutComponent } from './common/login/login-layout/login-layout.component';
import { ResetPasswordComponent } from './common/login/reset-password/reset-password.component';
import { SigninComponent } from './common/login/signin/signin.component';
import { VerifyOtpComponent } from './common/login/verify-otp/verify-otp.component';
import { SigninService } from './common/services/signin.service';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginLayoutComponent,
    ResetPasswordComponent,
    SigninComponent,
    VerifyOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot(STATES, {developmentMode: true}),
    MDBBootstrapModulesPro.forRoot(),

  ],
  providers: [SigninService],
  bootstrap: [AppComponent]
})
export class AppModule { }
