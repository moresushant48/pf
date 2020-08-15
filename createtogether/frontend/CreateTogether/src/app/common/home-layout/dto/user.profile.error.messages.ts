import { ValidationMessages } from '../../../shared/validation-messages';

export class UserProfileErrorMessages {

    public static ChangePasswordErrors: ValidationMessages[] = [
        new ValidationMessages('oldPassword', 'required', 'Old Password is Required'),
        new ValidationMessages('newPassword', 'required', 'New Password is Required'),
        new ValidationMessages('newPassword', 'pattern', 'Password must be between 8 to 15 characters and must contain 1 Capital, 1 Number and 1 Spl Character.'),
        new ValidationMessages('confirmPassword', 'required', 'Confirm Password is Required'),
        new ValidationMessages('confirmPassword', 'pattern', 'Password must be between 8 to 15 characters and must contain 1 Capital, 1 Number and 1 Spl Character'),
    ];

    public static UpdateProfileErrors: ValidationMessages[] = [
        new ValidationMessages('email', 'required', 'Official Email is Required'),
        new ValidationMessages('email', 'email', 'Official Email is must be in a proper format'),
        new ValidationMessages('countryCode', 'required', 'Country Code is Required'),
        new ValidationMessages('mobile', 'required', 'Mobile Number is Required'),
    ]

}
