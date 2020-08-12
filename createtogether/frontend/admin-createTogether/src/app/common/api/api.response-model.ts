import {ErrorMessages} from './error.messages';


export class APIResponseModel {
  state: boolean;
  errorMessage: string;
  isDataAvailable: boolean;
  successMessage: string;
  data: any;
  errors: ErrorMessages[];
}
