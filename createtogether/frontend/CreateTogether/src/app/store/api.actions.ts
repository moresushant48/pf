import { ErrorMessages } from '../common/api/error.messages';

export class ApiLoadingStart {
  static readonly type = '[API Loading] Start';
  constructor(public apiName: string) {
  }
}

export class ApiLoadingSuccess {
  static readonly type = '[API Loading] Success';
  constructor(public apiName: string) {
  }
}

export class ApiLoadingError {
  static readonly type = '[API Loading] Error';
  constructor(public apiName: string, public errors: ErrorMessages[]) {
  }
}

