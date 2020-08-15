import {APIEndPoint} from './api.endpoints';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {APIResponseModel} from './api.response-model';
import * as _ from 'underscore';
import {catchError, tap} from 'rxjs/operators';
import {Utilities} from '../../utilities';
import {Store} from "@ngxs/store";
import {SigninState} from "../../store/signin.state";
import {ApiLoadingError, ApiLoadingStart, ApiLoadingSuccess} from "../../store/api.actions";
import {APIState, APIStateModel} from "../../store/app.state";
import {APILoadingState, ApiLoadingStateModel} from "../../store/api.state";
import * as moment from 'moment';

export class APIBase {
  private endpoints: APIEndPoint[];
  // protected moduleBaseURL: string;
  protected readonly baseURL = environment.BaseAPI;
  protected _http: HttpClient;
  protected _store: Store;

  constructor(http: HttpClient,  store: Store) {
    this._http = http;
    this._store = store;
  }

  protected setEndPoints(ep: APIEndPoint[]) {
    this.endpoints = ep;
  }

  private getToken(): string {
    return this._store.selectSnapshot<string>(SigninState.getToken);
  }

  public storeRequest<T>(endPoint: string, data?: T): Observable<APIResponseModel> {
    console.log(endPoint,"endPoint");
    this._store.dispatch(new ApiLoadingStart(endPoint));
    return this.request(endPoint, data).pipe(
      tap(data => {
        this._store.dispatch(new ApiLoadingSuccess(endPoint));
        return data;
      }),
      catchError(err => {
        const errMessages = Utilities.handleError(err);
        this._store.dispatch(new ApiLoadingError(endPoint, errMessages));
        return throwError(errMessages);
      } )
    );
  }

  public request<T>(endPoint: string, data?: T): Observable<APIResponseModel> {
    // Find API Endpoint
    const api: APIEndPoint = _.find(
      this.endpoints,
      (val: APIEndPoint, key: number) => {
        return val.name === endPoint;
      }
    );


    let url = '';

    if (!Utilities.isNullOrEmpty(api.moduleBaseURL)) {
      url = this.baseURL + '/' + api.moduleBaseURL;
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (api.authReq) {
      headers = headers.set('Authorization', 'Bearer ' + this.getToken());
    }


    if (api.method === 'get') {
      return this.getRequest(url, api.endPoint, headers, data);
    } else if (api.method === 'post') {
      return this.postRequest(url, api.endPoint, data, headers);
    }


  }


  private getRequest(url: string, endPoint: string, headers: HttpHeaders, data): Observable<APIResponseModel> {
    // Concatinate params to embed params in url. This is for GET Only
    let paramString = '';

    if (!Utilities.isObjectNullOrEmpty(data)) {
      for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          paramString += data[prop] + '/';
        }
      }
    }

    if (paramString.length > 0) {
      paramString = '/' + paramString;
    }

    const finalUrl = url + endPoint + paramString;

    return this._http.get<APIResponseModel>(finalUrl, {
      headers
    });

  }

  private postRequest<T>(url: string, endPoint: string, data: T, headers: HttpHeaders): Observable<APIResponseModel> {

    const finalUrl = url + endPoint;
    return this._http.post<APIResponseModel>(finalUrl, data, {
      headers
    });
  }


  protected downloadFormat(endPoint: string, ...fileName: string[]): Observable<HttpResponse<Blob>> {
    let fileNameString = ''
    const api: APIEndPoint = _.find(
      this.endpoints,
      (val: APIEndPoint, key: number) => {
        return val.name === endPoint;
      }
    );
    fileName.forEach(element => {
      fileNameString += element + '/';
    });

    if (!api)
      return null;
    let url = '';
    if (!Utilities.isNullOrEmpty(api.moduleBaseURL)) {
      url = this.baseURL + '/' + api.moduleBaseURL + "/" + api.endPoint + "/" + fileNameString;
    }
    else
      return null;


    let headers = new HttpHeaders({
      ContentType: 'multipart/form-data'
    });

    headers = headers.set('Authorization', ' Bearer ' + this.getToken());
    return this._http.get(url, { headers, responseType: 'blob', observe: 'response' });
  }

}

