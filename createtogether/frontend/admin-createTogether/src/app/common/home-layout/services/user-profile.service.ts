import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {APIBase, APIEndPoint, APIResponseModel} from '../../api';

@Injectable()
export class UserProfileService extends  APIBase {
  readonly ep: APIEndPoint[] = [
    new APIEndPoint('user-profile', '/user-profile', 'get', true, 'user/account'),
    new APIEndPoint('save-user-profile', '/save/user-profile', 'post', true, 'user/account'),

    new APIEndPoint('branch', '/branches', 'get', true, 'master'),

    new APIEndPoint('designations', '/designations', 'get', true, 'user/account'),

    new APIEndPoint('change-password', '/change-password', 'post', true, 'user/account'),
    new APIEndPoint('get-notifications', '/get-notifications', 'get', true, 'user/account'),

    new APIEndPoint('my-info', '/my-info', 'get', true, 'user/account'),
    new APIEndPoint('get-menu', '/v2/menu', 'get', true, 'user/account'),
  ];

  constructor(http: HttpClient, store: Store) {
    super(http, store);
    this.setEndPoints(this.ep);
  }

  getMyInfo(): Observable<APIResponseModel> {
    return this.request('my-info');
  }

  getMenu(): Observable<APIResponseModel> {
    return this.request('get-menu');
  }

}
