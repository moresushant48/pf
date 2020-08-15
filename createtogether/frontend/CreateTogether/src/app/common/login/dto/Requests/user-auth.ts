
export class UserAuth {

  public client_id = 'ro.employee';
  public grant_type = 'password';
  public scope = 'ensure_emp.scope openid';
  public client_secret = 'secret';
  public username: string;
  public password: string;
  public pwd_type: string;

}
