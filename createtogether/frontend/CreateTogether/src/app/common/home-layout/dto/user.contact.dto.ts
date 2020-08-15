import { ISelectDto } from '../../../shared/select.dto';


export class UserContactDto {
    email: string;
    alternateEmail: string;
    countryCode: string;
    mobileNumber: string;
    alternateCountryCode: string;
    alternateMobileNumber: string;
    isEmailMandatory: boolean;
    gender: string;
    volunteerId: string;
}