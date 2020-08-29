import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { ErrorSummaryComponent } from './components/error-summary/error-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AppFormComponent } from './components/app-form/app-form.component';

@NgModule({
  declarations: [ConfirmModalComponent, NotificationModalComponent, ErrorSummaryComponent, AppFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalComponent,
    NotificationModalComponent,
    ErrorSummaryComponent,
    AppFormComponent
  ]
})
export class SharedModule { }
