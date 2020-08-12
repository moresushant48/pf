import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable,  throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {APIBase, APIEndPoint, APIResponseModel} from '../api';
import {SigninRequestModel} from '../../store/signin.actions';
import {SigninStateModel} from '../../store/signin.state';
import {environment} from '../../../environments/environment';
import {ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto} from '../login/requests';
import {ApiLoadingError, ApiLoadingStart, ApiLoadingSuccess} from '../../store/api.actions';
import {Utilities} from '../../utilities';


@Injectable()
export class SigninService extends  APIBase{
  readonly ep: APIEndPoint[] = [
    new APIEndPoint('forgot-password', '/forgot-password', 'post', false, 'user'),
    new APIEndPoint('verify-otp', '/verify-otp', 'post', false, 'user'),
    new APIEndPoint('change-password', '/change-password', 'post', false, 'user')
  ];

  constructor(http: HttpClient, private store: Store) {
    super(http, store);
    this.setEndPoints(this.ep);
  }

  forgotPassword(dto: ForgotPasswordDto): Observable<APIResponseModel> {
    return this.storeRequest('forgot-password', dto);
  }

  verifyOTP(dto: VerifyOtpDto): Observable<APIResponseModel> {
    return this.storeRequest('verify-otp', dto);
  }

  resetPassword(dto: ResetPasswordDto): Observable<APIResponseModel> {
    return this.storeRequest('change-password', dto);
  }

}
