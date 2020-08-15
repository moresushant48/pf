import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Utilities } from '../utilities';

export function requiredWithoutSpace(control: FormControl) {
  const isWhitespace = (control.value.toString() || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'required': true };
}

export function validateName(control: FormControl) {
  const regEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace && regEx.test(control.value);
  return isValid ? null : { 'required': true };
}

export function validateDate(control: FormControl) {
  const val = control.value.toString();
  if (Utilities.isNullOrEmpty(val)) {
    return null;
  }

  const momentDate = moment(control.value.toString(), 'DD/MM/YYYY');
  const isValid = momentDate.isValid();
  return isValid ? null : { 'dateFormat': true };
}
