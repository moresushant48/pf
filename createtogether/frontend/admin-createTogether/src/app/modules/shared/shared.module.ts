import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { ErrorSummaryComponent } from './components/error-summary/error-summary.component';



@NgModule({
  declarations: [ConfirmModalComponent, NotificationModalComponent, ErrorSummaryComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
