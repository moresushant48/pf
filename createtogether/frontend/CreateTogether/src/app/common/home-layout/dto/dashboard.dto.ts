import {  DisplaySettingsDto } from '../dto';
import { UserDto } from './user.dto';

export class DashboardDto {
    userDetails: UserDto;
    displaySettings: DisplaySettingsDto;
}
