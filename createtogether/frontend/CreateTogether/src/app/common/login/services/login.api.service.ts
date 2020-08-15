import { Injectable } from '@angular/core';
import { APIBase, APIEndPoint } from '../../api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable()
export class LoginAPIService extends APIBase {
  readonly ep: APIEndPoint[] = [

    new APIEndPoint('validate', '/validate', 'post', false, 'user/volunteer'),

    new APIEndPoint('request-otp', '/request-otp', 'post', false, 'user/volunteer'),

    new APIEndPoint('forgot-password', '/forgot-password', 'post', false, 'user/volunteer'),

    new APIEndPoint('verify-otp', '/verify-otp', 'post', false, 'user/volunteer'),

    new APIEndPoint('reset-password', '/reset-password', 'post', false, 'user/volunteer'),

    new APIEndPoint('get-logo', '/get-logo', 'get', false, 'user/volunteer'),
  ];

  constructor(http: HttpClient, router: Router, private store: Store) {
    super(http, store);
    this.setEndPoints(this.ep);
  }
}
