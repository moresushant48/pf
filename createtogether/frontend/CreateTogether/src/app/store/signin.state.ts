import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Signin, SigninRequestModel, Signout} from './signin.actions';
import {ApiLoadingError, ApiLoadingStart, ApiLoadingSuccess} from './api.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import produce from 'immer';
import {Utilities} from '../utilities';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


export interface SigninStateModel {
   access_token: string;
   expires_in: number;
   token_type: string;
   error: string;
   canLogin: boolean;
}

@State<SigninStateModel>({
  name: 'auth',
  defaults: {
    access_token: '',
    expires_in: 0,
    token_type: '',
    error: '',
    canLogin: false
  }
})
@Injectable()
export class SigninState {

  constructor( private _http: HttpClient, private _store: Store) {
  }
  @Selector()
  static canLogin(state: SigninStateModel) {
    return state.canLogin;
  }

  @Selector()
  static getToken(state: SigninStateModel) {
    return state.access_token;
  }

  private _signIn(auth: SigninRequestModel ): Observable<SigninStateModel> {
    const signInUrl = environment.BaseAPI + '/identity/connect/token';

    let headers = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
    });

    let params = new HttpParams()
      .set('client_id', auth.client_id)
      .set('grant_type', auth.grant_type)
      .set('scope', auth.scope)
      .set('client_secret', auth.client_secret)
      .set('username', auth.username)
      .set('password', auth.password);
    return this._http.post<SigninStateModel>(signInUrl, params, {
      headers
    });
  }

  @Action(Signin)
  signIn(ctx: StateContext<SigninStateModel>, action: Signin){
    return ctx.dispatch(new ApiLoadingStart('signin')).pipe(
      switchMap(() => this._signIn(action.payload)),
      tap((data) => {
        const state = produce(ctx.getState(), draft => {
          draft.error = data.error;
          draft.access_token = data.access_token;
          draft.expires_in = data.expires_in;
          draft.token_type = data.token_type;
          draft.canLogin = !Utilities.isNullOrEmpty(draft.access_token);
        });
        ctx.setState(state);
      }),
      mergeMap(() => {
        return ctx.dispatch(new ApiLoadingSuccess('signin'));
      }),
      catchError(err => {
        return ctx.dispatch(new ApiLoadingError('signin',Utilities.handleError(err)))
      })
    );
  }

  @Action(Signout)
  signOut(ctx: StateContext<SigninStateModel>) {
    const state = produce(ctx.getState(), draft => {
      draft.error = '';
      draft.access_token = '';
      draft.expires_in = 0;
      draft.token_type = '';
      draft.canLogin = false;
    });
    ctx.setState(state);

  }

  

}
