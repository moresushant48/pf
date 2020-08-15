import { UserAuthResp } from './../dto/Responses/user-auth-resp';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LoginAPIService } from './login.api.service';
import { Observable, throwError } from 'rxjs';
import { APIResponseModel } from '../../api';
import { UserNameDto, EmployeeInitialContactDto, VerifyOtpDto, ResetPasswordDto, OTPRequestDto } from '../dto';
import { map, catchError } from 'rxjs/operators';
import { LoginDataService } from './login.data.service';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ErrorMessages } from '../../api/error.messages';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LoginService {
  protected _http: HttpClient;
  protected _router: Router;
  protected _cookieService: CookieService;

  constructor(
    private _service: LoginAPIService,
    private loginDataService: LoginDataService,
    private http: HttpClient,
    router: Router,
    cookieService: CookieService,
    @Inject(PLATFORM_ID) private platform: Object,
  ) {
    this._http = http;
    this._router = router;
    this._cookieService = cookieService;
  }

  validateUserName(userName: UserNameDto): Observable<APIResponseModel> {
    return this._service.request('validate', userName);
  }

  isFirstLogin(): Observable<APIResponseModel> {
    // return this._service.request('is-first-login').pipe(map(x => {
    //   this.loginDataService.updateFirstLoginData(x.data);
    //   return x;
    // }));
    let d = new UserAuthResp();
    if (isPlatformBrowser(this.platform))
      d = JSON.parse(localStorage.getItem('loginPswdData'));
    const url = environment.BaseAPI + '/user/employee/home/is-first-login';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    if (d)
      headers = headers.set('Authorization', 'Bearer ' + d.access_token);
    return this._http.get<APIResponseModel>(url, { headers }).pipe(map(x => {
      this.loginDataService.updateFirstLoginData(x.data);
      return x;
    }), catchError(this.handleError(this._cookieService, this._router)))

  }

  requestOTP(otpReqDto: OTPRequestDto): Observable<APIResponseModel> {
    return this._service.request('request-otp', otpReqDto);
  }

  getCountryCodeList(): Observable<APIResponseModel> {
    // return this._service.request('country-code-list');
    let d = new UserAuthResp();
    if (isPlatformBrowser(this.platform))
      d = JSON.parse(localStorage.getItem('loginPswdData'));

    const url = environment.BaseAPI + '/master/country-code-list';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    headers = headers.set('Authorization', 'Bearer ' + d.access_token);
    return this._http.get<APIResponseModel>(url, { headers }).pipe(catchError(this.handleError(this._cookieService, this._router)))
  }

  updateInitialContact(updateContactDto: EmployeeInitialContactDto): Observable<APIResponseModel> {
    // return this._service.request('update-initial-contact', updateContactDto);

    let d = new UserAuthResp();
    if (isPlatformBrowser(this.platform))
      d = JSON.parse(localStorage.getItem('loginPswdData'));

    const url = environment.BaseAPI + '/user/employee/home/update-initial-contact';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    headers = headers.set('Authorization', 'Bearer ' + d.access_token);
    return this._http.post<APIResponseModel>(url, updateContactDto, { headers }).pipe(catchError(this.handleError(this._cookieService, this._router)));
  }

  forgotPassword(otpReqDto: OTPRequestDto): Observable<APIResponseModel> {
    return this._service.request('forgot-password', otpReqDto);
  }

  verifyOTP(otpDto: VerifyOtpDto): Observable<APIResponseModel> {
    return this._service.request('verify-otp', otpDto);
  }

  resetPassword(passwordDto: ResetPasswordDto): Observable<APIResponseModel> {
    return this._service.request('reset-password', passwordDto);
  }

  getClientLogo(tenantName: string): Observable<APIResponseModel> {
    return this._service.request('get-client-logo', { tenantName });
  }


  private handleError(cookieService: CookieService, router: Router) {
    return (err: HttpErrorResponse): Observable<never> => {

      let errorMessages: ErrorMessages[] = [];


      switch (err.status) {
        case 401:
        case 403:
          cookieService.removeAll();
          router.navigate(['/login']);
          break;
        case 500:
          const em: ErrorMessages = new ErrorMessages('', err.statusText);
          errorMessages.push(em);
          break;
        case 501:
          const errResp: APIResponseModel = err.error as APIResponseModel;
          if (errResp.errorMessage.toLowerCase().includes('multiple', 1)) {
            errorMessages = errResp.errors;
          } else {
            const em: ErrorMessages = new ErrorMessages('', errResp.errorMessage);
            errorMessages.push(em);
          }
          break;
      }


      return throwError(errorMessages);

    };
  }
}
