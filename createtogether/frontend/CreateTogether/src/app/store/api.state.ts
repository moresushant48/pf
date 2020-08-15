import {APIStateModel} from './app.state';
import {Action, createSelector, State, StateContext} from '@ngxs/store';
import {ApiLoadingError, ApiLoadingStart, ApiLoadingSuccess} from './api.actions';
import produce from 'immer';
import {ErrorMessages} from '../common/api/error.messages';
import {Injectable} from '@angular/core';
import {Signout} from './signin.actions';
import * as moment from 'moment';

export interface ApiLoadingStateModel extends APIStateModel {
  apiName: string;
  isLoading: boolean;
  isSuccess: boolean;
  errors: ErrorMessages[];
  lastExecAt: moment.Moment;
}

@State<ApiLoadingStateModel[]>(
  {
    name: 'apiLoadingState',
    defaults: []
  }
)
@Injectable()
export class APILoadingState {

  constructor() {
  }

  @Action(ApiLoadingStart)
  apiStart(ctx: StateContext<ApiLoadingStateModel[]>, action: ApiLoadingStart) {
    const state = produce(ctx.getState(), draft => {
      const index = draft.findIndex(x => x.apiName === action.apiName);
      if (index > -1) {
        draft[index].isLoading = true;
        draft[index].isSuccess = false;
        draft[index].errors = [];
        draft[index].lastExecAt = moment();
      } else {
        const status = {
          apiName: action.apiName,
          isLoading: true,
          isSuccess: false,
          errors: [],
          lastExecAt: moment()
        } as ApiLoadingStateModel;
        draft.push(status);
      }
    });
    ctx.setState(state);
  }

  @Action(ApiLoadingSuccess)
  apiSuccess(ctx: StateContext<ApiLoadingStateModel[]>, action: ApiLoadingSuccess) {
    const state = produce(ctx.getState(), draft => {
      const index = draft.findIndex(x => x.apiName === action.apiName);
      if (index > -1) {
        draft[index].isLoading = false;
        draft[index].isSuccess = true;
        draft[index].errors = [];
        draft[index].lastExecAt = moment();
      }
    });
    ctx.setState(state);
  }

  @Action(ApiLoadingError)
  apiError(ctx: StateContext<ApiLoadingStateModel[]>, action: ApiLoadingError) {

    const state = produce(ctx.getState(), draft => {
      const index = draft.findIndex(x => x.apiName === action.apiName);
      if (index > -1) {
        draft[index].isLoading = false;
        draft[index].isSuccess = false;
        draft[index].errors = action.errors;
        draft[index].lastExecAt = moment();

        if (draft[index].errors.length === 1 &&
          draft[index].errors[0].httpStatus >= 400 &&
          draft[index].errors[0].httpStatus <= 499) {
          // this._cookieService.removeAll();
          ctx.dispatch(new Signout());
        }

      }
    });
    ctx.setState(state);
  }


  static getLastExecTime(apiName:string) {
    return createSelector([APILoadingState], (state: ApiLoadingStateModel[]) => {
      const apiState = state.find(x => x.apiName === apiName);
      return apiState.lastExecAt;
    });
  }

  static getAPIErrors(apiName: string) {
    return createSelector([APILoadingState], (state: ApiLoadingStateModel[]) => {
      const apiState = state.find(x => x.apiName === apiName);
      if (apiState)
        return (apiState.isLoading == false && apiState.isSuccess == false) ? apiState.errors : [];
      else
        return [];
    });
  }

  static isAPISuccess(apiName: string) {
    return createSelector([APILoadingState], (state: ApiLoadingStateModel[]) => {
      const apiState = state.find(x => x.apiName === apiName);
      if (apiState)
        return apiState.isLoading ? false : apiState.isSuccess;
      else
        return false;
    });

  }


  static isLoading(apiName: string) {
    return createSelector([APILoadingState], (state: ApiLoadingStateModel[]) => {
      const apiState = state.find(x => x.apiName === apiName);
      if (apiState)
        return apiState.isLoading;
      else
        return false;
    });
  }

}
