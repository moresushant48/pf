import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {APIResponseModel} from '../common/api';
import {SigninState} from '../store/signin.state';
import {environment} from '../../environments/environment';
import {ErrorMessages} from '../common/api/error.messages';

@Injectable()
export class FileService {

  constructor(private _http: HttpClient,
              private _router: Router,
              private _store: Store) {}

  private getToken(): string {
    return this._store.selectSnapshot<string>(SigninState.getToken);
  }

  uploadImage(data): Observable<APIResponseModel> {
    const url = environment.BaseAPI + '/aws/files/upload-image';
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.post<APIResponseModel>(url, data, { headers }).pipe(catchError(this.handleError()));
  }

  uploadFile(data): Observable<APIResponseModel> {
    const url = environment.BaseAPI + '/aws/files/upload';
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.post<APIResponseModel>(url, data, { headers }).pipe(catchError(this.handleError()));
  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = environment.BaseAPI + '/aws/files/download/' + fileName;
    // return this.service.request('download-file', { fileName });
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.get(url, { headers, responseType: 'blob' });
  }

  downloadImage(fileName: string): Observable<Blob> {
    const url = environment.BaseAPI + '/aws/files/download-image/' + fileName;
    // return this.service.request('download-file', { fileName });
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.get(url, { headers, responseType: 'blob' });
  }

  downloadGpaGtlPolicyCertificates(fileName: string): Observable<Blob> {
    const url = environment.BaseAPI + '/aws/files/download-policy-certificate/' + fileName;
    // return this.service.request('download-file', { fileName });
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.get(url, { headers, responseType: 'blob' });
  }

  uploadGpaGtlFile(data): Observable<APIResponseModel> {
    const url = environment.BaseAPI + '/aws/files/upload-gpa-gtl';
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.post<APIResponseModel>(url, data, { headers }).pipe(catchError(this.handleError()));
  }

  uploadAttachments(data): Observable<APIResponseModel> {
    const url = environment.BaseAPI + '/aws/files/upload-attachments';
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.post<APIResponseModel>(url, data, { headers }).pipe(catchError(this.handleError()));
  }

  downloadEmailScheduler(data): Observable<Blob> {
    const url = environment.BaseAPI + '/communication/emailer/get-send-mail-format';
    // return this.service.request('download-file', { fileName });
    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.post<Blob>(url, data, { headers, responseType: 'blob' as 'json' }).pipe(catchError(this.handleError()));
  }

  downloadEcard(memberId, policyId): Observable<Blob> {
    const url = environment.BaseAPI + '/enrollment/enrollment/generate-ecard-template/' + memberId + '/' + policyId;
    // return this.service.request('download-file', { fileName });
    let headers = new HttpHeaders({
        ContentType: 'multipart/form-data'
    });
    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.get(url, { headers, responseType: 'blob' }).pipe(catchError(this.handleError()));
  }

  private handleError() {
    return (err: HttpErrorResponse): Observable<never> => {
      let errorMessages: ErrorMessages[] = [];

      switch (err.status) {
        case 401:
        case 403:
          // TODO: Do Redirect when Unauthorised.
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
