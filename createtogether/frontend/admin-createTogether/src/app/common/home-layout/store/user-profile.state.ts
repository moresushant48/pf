import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserProfile} from './user-profile.actions';
import {ApiLoadingError, ApiLoadingStart, ApiLoadingSuccess} from '../../../store/api.actions';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import produce from 'immer';
import {Utilities} from '../../../utilities';
import {UserProfileService} from '../services/user-profile.service';

export interface UserProfileModel {

  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userType: number;
}

@State<UserProfileModel>({
  name: 'profile',
  defaults: {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    userType: 0
  }
})
@Injectable()
export class UserProfileState{

  constructor(private _service: UserProfileService) {
  }

  @Action(UserProfile)
  getProfile(ctx: StateContext<UserProfileModel>) {
    return ctx.dispatch(new ApiLoadingStart('my-info')).pipe(
      switchMap(() => this._service.getMyInfo()),
      tap((resp) => {
        const state = produce(ctx.getState(), draft => {
          draft.id = resp.data.UserId;
          draft.mobile = resp.data.Mobile;
          draft.email = resp.data.Email;
          draft.firstName = resp.data.FirstName;
          draft.lastName = resp.data.LastName;
          draft.fullName = resp.data.FullName;
          draft.userType = resp.data.UserType;
        });
        ctx.setState(state);
      }),
      mergeMap(() => {
        return ctx.dispatch(new ApiLoadingSuccess('my-info'));
      }),
      catchError(err => {
        console.log(err);
        return ctx.dispatch(new ApiLoadingError('my-info',Utilities.handleError(err)))
      })
    );
  }

  @Selector()
  static getProfile(state: UserProfileModel) {
    return state;
  }

}
