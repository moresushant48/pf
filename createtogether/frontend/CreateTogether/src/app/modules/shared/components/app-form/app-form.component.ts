import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessages } from '../../../../common/api/error.messages';
import { ValidationMessages } from '../../../../shared/validation-messages';
import { Utilities } from '../../../../utilities';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppFormComponent implements OnInit, OnChanges {

  public get customValidation() {
    return this._customValidation;
  }

  @Input()
  public set customValidation(value) {
    this._customValidation = value;
  }

  constructor() { }


  @Input() formGroup: FormGroup;

  @Input() name: string;

  @Input() id: string;

  @Input() validationMessage: ValidationMessages[] = [];

  @Input() apiErrorMessages: ErrorMessages[];

  @Input() showActionButtons = true;

  @Input() showCloseButton = false;

  @Input() showResetButton = false;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  @Input() successMessage = '';

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onReset: EventEmitter<any> = new EventEmitter<any>();

  public errorMessages: ErrorMessages[] = [];

  isValid = true;

  @Input() displayLoading = false;
  @Input() loadingOverlay: 'white' | 'black' = 'white';
  @Input() loadingMessage = 'Saving data...';

  private _customValidation = (formGroupVal, errMessages: ErrorMessages[]) => { return; };

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {


    if (changes.apiErrorMessages && (changes.apiErrorMessages.currentValue !== changes.apiErrorMessages.previousValue)) {
      this.errorMessages = [];
      const emArray = changes.apiErrorMessages.currentValue as ErrorMessages[];
      emArray.forEach((v) => {
        this.errorMessages.push(v);
      });
      if (this.errorMessages.length > 0) { this.isValid = false; }
    }
  }

  onFormSubmit() {
    this.errorMessages = Utilities.validateForm(this.formGroup, this.validationMessage);

    this.isValid = this.formGroup.valid;

    if (typeof (this._customValidation) !== 'function') { throw new Error('Assigned value for custom validation is not a function'); }

    if (!this.errorMessages) { this.errorMessages = []; }

    this._customValidation(this.formGroup.getRawValue(), this.errorMessages);



    if (this.errorMessages.length > 0) { this.isValid = false; }

    if (!this.isValid) { return; }

    this.onSubmit.emit({
      isValid: this.isValid,
      form: this.formGroup.getRawValue()
    });
  }

  onFormReset() {
    console.log('Form Reset...');
    this.isValid = true;
    this.onReset.emit();
  }

  onFormCloseClick() {
    this.onClose.emit();
  }


}
