import {ValidationMessages} from '../../shared/validation-messages';


export class LoginErrorMessages {

  public static SignInErrors: ValidationMessages[] =
    [new ValidationMessages('email', 'required', 'Email is required'),
    new ValidationMessages('email', 'email', 'Email should be in proper format'),
    new ValidationMessages('password', 'required', 'Password is required')
    ];

  public static ForgotPasswordErrors: ValidationMessages[] = [
    new ValidationMessages('email', 'required', 'Email is required'),
    new ValidationMessages('email', 'email', 'Email should be in proper format')
  ];


  public static OTPErrors: ValidationMessages[] = [
    new ValidationMessages('otp', 'required', 'OTP is required'),
  ];

  public static ResetPasswordErrors: ValidationMessages[] = [
    new ValidationMessages('newPassword', 'required', 'New password is required'),
    new ValidationMessages('confirmPassword', 'required', 'Confirm password is required'),
    new ValidationMessages('newPassword', 'pattern', 'Password must be between 8 to 15 characters and must contain 1 Capital, 1 Number and 1 Spl Character.')
  ];



}
