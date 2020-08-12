
export class SigninRequestModel {
  public client_id = 'ro.admin';
  public grant_type = 'password';
  public scope = 'ensure.scope openid';
  public client_secret = 'secret';
  public username: string;
  public password: string;
}

export class Signin {
  static readonly type = '[Signin API] Call SignIn API';
  constructor(public payload: SigninRequestModel) {
  }
}

export class Signout {
  static readonly type = '[Signout API] Call Signout API';
}
