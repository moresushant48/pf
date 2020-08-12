import {State} from '@ngxs/store';
import {APILoadingState} from './api.state';
import {Injectable} from '@angular/core';


export interface APIStateModel {

}


@State<APIStateModel>({
  name: 'api',
  defaults: {},
  children: [APILoadingState]
})
@Injectable()
export class APIState {

}

