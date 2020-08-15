import { Injectable } from '@angular/core';
import { APIBase, APIEndPoint } from '../../api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable()
export class UserProfileApiService extends APIBase {

  readonly ep: APIEndPoint[] = [
    new APIEndPoint('my-info', '/my-info', 'get', true, 'user/account'),
    new APIEndPoint('get-dashboard-config', '/get-dashboard-config', 'get', true, 'user/employee/home'),
    new APIEndPoint('change-password', '/change-password', 'post', true, 'user/employee/home'),
    new APIEndPoint('get-contact', '/get-contact', 'get', true, 'user/employee/home'),
    new APIEndPoint('update-contact', '/update-contact', 'post', true, 'user/employee/home'),
    new APIEndPoint('country-code-list', '/country-code-list', 'get', true, 'master'),

    new APIEndPoint('logout-employee', '/logout-employee', 'get', true, 'user/employee/home'),
  ];

  constructor(http: HttpClient, store: Store) {
    super(http, store);
    this.setEndPoints(this.ep);
  }
}
