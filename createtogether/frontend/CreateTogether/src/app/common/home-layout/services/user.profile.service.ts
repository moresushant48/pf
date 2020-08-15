import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../../api';
import { UserProfileApiService } from './user.profile.api.service';
import { map } from 'rxjs/operators';
import { ProfileDataService } from './profile.data.service';
import { ChangePasswordDto, UserContactDto } from '../dto';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class UserProfileService {
  constructor(
    private service: UserProfileApiService,
    private _profileDataService: ProfileDataService,
    @Inject(PLATFORM_ID) private platform: Object,
  ) { }

  getMyInfo(): Observable<APIResponseModel> {
    return this.service.request('my-info');
  }

  getDashboardConfig(): Observable<APIResponseModel> {

    if (isPlatformBrowser(this.platform)) { localStorage.removeItem('loginPswdData'); }

    return this.service.request('get-dashboard-config').pipe(map(x => {
      this._profileDataService.updateMenuItems(x.data);
      return x;
    }));
  }

  changeUserPassword(userPassword: ChangePasswordDto): Observable<APIResponseModel> {
    return this.service.request('change-password', userPassword);
  }

  getCountryCodeList(): Observable<APIResponseModel> {
    return this.service.request('country-code-list');
  }

  getUserDetails(): Observable<APIResponseModel> {
    return this.service.request('get-contact');
  }

  updateUserDetails(empDetails: UserContactDto): Observable<APIResponseModel> {
    return this.service.request('update-contact', empDetails);
  }

  logout(): Observable<APIResponseModel> {
    return this.service.request('logout-user');
  }
}
