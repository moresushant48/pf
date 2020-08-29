import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { INotificationType } from './notification-type';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ErrorMessages } from '../../../../common/api/error.messages';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit, INotificationType {

  message: string = '';
  autoClose: boolean = true;
  autoCloseTimeout: number = 5000;
  type: 'success' | 'info' | 'primary' | 'danger' = 'success';
  errors: ErrorMessages[] = [];

  textType: string;
  iconType: IconProp;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    console.log(this.errors);
    if (this.autoClose) {
      setTimeout(() => {
        this.modalRef.hide();
      }, this.autoCloseTimeout);
    }

    switch (this.type) {
      case 'success':
        this.textType = 'text-success';
        this.iconType = ['fal', 'shield-check'];
        break;
      case 'info':
        this.textType = 'text-info';
        this.iconType = ['fal', 'info-square'];
        break;
      case 'primary':
        this.textType = 'text-primary';
        this.iconType = ['fal', 'cloud'];
        break;
      case 'danger':
        this.textType = 'text-danger';
        this.iconType = ['fal', 'exclamation-triangle'];
    }

  }



}
