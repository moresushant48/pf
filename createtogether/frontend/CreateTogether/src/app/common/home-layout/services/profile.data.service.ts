
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DisplaySettingsDto, DashboardDto, UserDto } from '../dto';

@Injectable()
export class ProfileDataService {
    private _menuItems: DisplaySettingsDto;
    private _userDetails: UserDto;

    private _menuItemsSubject: BehaviorSubject<DisplaySettingsDto> = new BehaviorSubject<DisplaySettingsDto>(undefined);
    private _userDetailsSubject: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>(undefined);

    public menuItems = this._menuItemsSubject.asObservable();
    public userDetails = this._userDetailsSubject.asObservable();

    public getMenuItems(): DisplaySettingsDto {
        return this._menuItems;
    }

    public updateMenuItems(items: DashboardDto) {
        this._menuItems = items.displaySettings;
        this._userDetails = items.userDetails;

        this._menuItemsSubject.next(this._menuItems);
        this._userDetailsSubject.next(this._userDetails);
    }

    public getUserDetails(): UserDto {
        return this._userDetails;
    }


}
