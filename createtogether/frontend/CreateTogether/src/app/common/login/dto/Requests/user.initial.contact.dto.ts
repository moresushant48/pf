

import { ISelectDto } from '../../../../shared/select.dto';

export class UserInitialContactDto {
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