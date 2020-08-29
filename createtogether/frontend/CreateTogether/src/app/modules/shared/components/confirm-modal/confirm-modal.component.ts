import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IConfirmationResult, IConfirmationType } from '../notification-modal/notification-type';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit, IConfirmationType {

  message: string = '';
  type: 'success' | 'info' | 'primary' | 'danger' = 'success';
  expectedResponse?: string;
  requiredResponse: boolean;

  response: string;

  result$: Subject<IConfirmationResult> = new Subject<IConfirmationResult>();

  textType: string;
  iconType: IconProp;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
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

  onYes() {
    const result = {
      cancelled: false,
      response: this.requiredResponse ? this.response : ''
    } as IConfirmationResult;
    this.result$.next(result);
    this.modalRef.hide();
  }

  onCancel() {
    const result = {
      cancelled: true,
      response: ''
    } as IConfirmationResult;
    this.result$.next(result);
    this.modalRef.hide();
  }


}
