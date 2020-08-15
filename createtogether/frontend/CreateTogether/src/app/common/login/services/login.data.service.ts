import { Injectable } from '@angular/core';
import { EmployeeInitialContactDto } from '../dto';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginDataService {

    private _empInitialData: EmployeeInitialContactDto;

    private _employeeInitialContactSubject: BehaviorSubject<EmployeeInitialContactDto> = new BehaviorSubject<EmployeeInitialContactDto>(undefined);

    public getFirstLoginData(): EmployeeInitialContactDto {
        return this._empInitialData;
    }

    public updateFirstLoginData(data: EmployeeInitialContactDto) {
        this._empInitialData = data;
        this._employeeInitialContactSubject.next(this._empInitialData);
    }

}