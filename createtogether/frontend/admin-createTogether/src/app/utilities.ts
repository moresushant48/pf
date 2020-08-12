import * as _ from 'underscore';
import { environment } from '../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessages } from './common/api/error.messages';
import { APIResponseModel } from './common/api';
import { FormArray, FormGroup } from '@angular/forms';
import { ValidationMessages } from './shared/validation-messages';
import { InjectorInstance } from './injector-instance';
import { IOption, MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { IConfirmationType, INotificationType } from './modules/shared/components/notification-modal/notification-type';
import { NotificationModalComponent } from './modules/shared/components/notification-modal/notification-modal.component';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfirmModalComponent } from './modules/shared/components/confirm-modal/confirm-modal.component';
import { IOptions } from 'tslint';
import { ISelectDto } from './shared/select.dto';

 
export class Utilities {


  public static isNullOrEmpty(str: string): boolean {
    if (str === null || str === '' || str === undefined) {
      return true;
    }
    return false;
  }

  public static isObjectNullOrEmpty(obj: object): boolean {
    if (obj === null || obj === undefined) {
      return true;
    }

    return false;
  }

  public static getDistinct<T>(arrVal: T[], keyCol: string): T[] {
    return _.uniq(arrVal, false, (v, i) => {
      return v.hasOwnProperty(keyCol) ? v[keyCol] : '';
    });
  }

  public static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  public static ObjectCompare(obj1: any, obj2: any): boolean {
    // Loop through properties in object 1
    // tslint:disable-next-line: forin
    for (const p in obj1) {
      // Check property exists on both objects
      if (
        obj2 === undefined ||
        obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)
      ) {
        return false;
      }

      switch (typeof obj1[p]) {
        // Deep compare objects
        case 'object':
          if (!Utilities.ObjectCompare(obj1[p], obj2[p])) {
            return false;
          }
          break;
        // Compare function code
        case 'function':
          if (
            typeof obj2[p] === 'undefined' ||
            (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())
          ) {
            return false;
          }
          break;
        // Compare values
        default:
          if (obj1[p] !== obj2[p]) {
            return false;
          }
      }
    }

    // Check object 2 for any extra properties
    for (const p in obj2) {
      if (typeof obj1[p] === 'undefined' || obj1 === undefined) {
        return false;
      }
    }
    return true;
  }

  public static downloadFile(dataBlob, fileName) {
    console.log(fileName, 'fileName');
    // let blob = new Blob(dataBlob, { type: dataBlob.type});
    const url = window.URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }

  public static log(message?: any, ...optionalParams: any) {
    if (environment.env === 'Development')
      {console.log(message, optionalParams);}
    else {
      // Todo: Logging to Server;
    }
  }

  public static getMobileRegEx() {
    return /^[2|6-9]\d{9}$/;
  }

  public static getNameRegEx() {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  }

  public static getEmpNumRegEx() {
    return /^[a-z\d]+([-\/\\])?[a-z\d]+$/i;
  }

  public static getNameWithSpaceRegEx() {
    return /^[a-z/\s]+$/i;
  }

  public static handleError(err: HttpErrorResponse): ErrorMessages[] {

    let errorMessages: ErrorMessages[] = [];
    let em: ErrorMessages = null;

    switch (err.status) {
      case 0:
        em = new ErrorMessages('', err.message, err.status);
        errorMessages.push(em);
        break;
      case 400:
        em = new ErrorMessages('', err.error.error_description, err.status);
        errorMessages.push(em);
        break;
      case 401:
      case 403:
        em = new ErrorMessages('', err.message, err.status);
        errorMessages.push(em);
        break;
      case 404:
      case 500:
        em = new ErrorMessages('', err.statusText, err.status);
        errorMessages.push(em);
        break;
      case 501:
        const errResp: APIResponseModel = err.error as APIResponseModel;
        if (errResp.errorMessage.toLowerCase().includes('multiple', 1)) {
          errorMessages = errResp.errors;
        } else {
          em = new ErrorMessages('', errResp.errorMessage, err.status);
          errorMessages.push(em);
        }
        break;
    }

    return errorMessages;

  }

  public static validateForm(form: FormGroup, validationMessages: ValidationMessages[]): ErrorMessages[] {
    let errorMessages: ErrorMessages[] = [];
    if (!form.valid) {
      Object.keys(form.controls).forEach(key => {
        if (form.get(key).errors) {
          Object.keys(form.get(key).errors).forEach(eKey => {
            let em = Utilities.getError(validationMessages, key, eKey);
            let errorMessage: ErrorMessages = new ErrorMessages(key, em);
            errorMessages.push(errorMessage);
          });
        }

      });

      return errorMessages;

    }
  }

  public static getError(valMessages: ValidationMessages[], property: string, key: string): string {

    let message = '';
    valMessages.forEach((v, i) => {
      if (v.property === property && v.errorKey === key) {
        message = v.errorMessage;
        return;
      }
    });
    return message;
  }

  public static convertISelectDto(list: IOption[], value: string): ISelectDto {
    var option = list.find(x => x.value === value);
    console.log(option, 'option');
    console.log(list, 'list');
    console.log(value, 'value');

    return {
      id: option.value,
      name: option.label
    } as ISelectDto;
  }
  public static GetISelectDto(): ISelectDto {
    return {
      id: '',
      name: ''
    } as ISelectDto;
  }

  public static convertToOption(data: ISelectDto): IOption {
    return {
      value: data.id,
      label: data.name
    } as IOption;
  }

  public static createOptions(list: any, addNone: boolean = false): IOption[] {
    const noneOpt: IOption = {
      label: 'None',
      value: 'none'
    } as IOption;

    return !addNone ? list.map(i => {
      return {
        value: i.id,
        label: i.name
      } as IOption;
    }) : [noneOpt, ...list.map(i => {
      return {
        value: i.id,
        label: i.name
      } as IOption;
    })];
  }

  public static showMessage(options: {
    message: string,
    type?: 'success' | 'info' | 'primary' | 'danger',
    autoClose?: boolean,
    autoCloseTimeout?: number,
    position?: 'top' | 'bottom',
    errors?: ErrorMessages[]
  }
  ) {
    const modalService = InjectorInstance.sharedModuleInjector.get<MDBModalService>(MDBModalService);

    modalService.show(NotificationModalComponent, {
      backdrop: false,
      keyboard: true,
      focus: false,
      show: false,
      ignoreBackdropClick: true,
      class: `modal-${options.position || 'bottom'} modal-frame modal-notify modal-success`,
      containerClass: `fade modal-scrolling ${options.position || 'bottom'}`,
      animated: true,
      data: {
        message: options.message,
        autoClose: options.autoClose || true,
        autoCloseTimeout: options.autoCloseTimeout || 5000,
        type: options.type || 'success',
        errors: options.errors || []
      } as INotificationType
    });
  }

  public static showConfirmation(options: {
    message: string,
    type?: 'success' | 'info' | 'primary' | 'danger',
    requiredResponse: boolean,
    expectedResponse?: string,
    position?: 'top' | 'bottom'
  }
  ): MDBModalRef {
    const modalService = InjectorInstance.sharedModuleInjector.get<MDBModalService>(MDBModalService);
    return modalService.show(ConfirmModalComponent, {
      backdrop: false,
      keyboard: true,
      focus: false,
      show: false,
      ignoreBackdropClick: true,
      class: `modal-${options.position || 'bottom'} modal-frame modal-notify modal-success`,
      containerClass: `fade modal-scrolling ${options.position || 'bottom'}`,
      animated: true,
      data: {
        message: options.message,
        type: options.type || 'success',
        requiredResponse: options.requiredResponse || false,
        expectedResponse: options.expectedResponse || ''
      } as IConfirmationType
    });
  }

  // public static getAngularEditorConfig() {
  //   return {
  //     editable: true,
  //     spellcheck: true,
  //     height: 'auto',
  //     minHeight: '175px',
  //     maxHeight: 'auto',
  //     width: 'auto',
  //     minWidth: '0',
  //     translate: 'yes',
  //     enableToolbar: true,
  //     showToolbar: true,
  //     placeholder: 'Enter text here...',
  //     defaultParagraphSeparator: '',
  //     defaultFontName: '',
  //     defaultFontSize: '',
  //     fonts: [
  //       { class: 'arial', name: 'Arial' },
  //       { class: 'times-new-roman', name: 'Times New Roman' },
  //       { class: 'calibri', name: 'Calibri' },
  //       { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  //     ],
  //     customClasses: [
  //       {
  //         name: 'quote',
  //         class: 'quote',
  //       },
  //       {
  //         name: 'redText',
  //         class: 'redText'
  //       },
  //       {
  //         name: 'titleText',
  //         class: 'titleText',
  //         tag: 'h1',
  //       },
  //     ],
  //     uploadUrl: 'v1/image',
  //     uploadWithCredentials: false,
  //     sanitize: true,
  //     toolbarPosition: 'top',
  //     toolbarHiddenButtons: [
  //       ['fontSize', 'insertImage', 'insertVideo', 'customClasses']
  //     ]
  //   } as AngularEditorConfig;
  // }
  // public static getAngularEditorConfigHelpdesk() {
  //   return {
  //     editable: true,
  //     spellcheck: true,
  //     height: '15rem',
  //     minHeight: '5rem',
  //     placeholder: 'Enter text here...',
  //     translate: 'no',
  //     defaultParagraphSeparator: 'p',
  //     defaultFontName: 'Arial',
  //     toolbarHiddenButtons: [
  //       ['bold']
  //     ],
  //     customClasses: [
  //       {
  //         name: 'quote',
  //         class: 'quote',
  //       },
  //       {
  //         name: 'redText',
  //         class: 'redText'
  //       },
  //       {
  //         name: 'titleText',
  //         class: 'titleText',
  //         tag: 'h1',
  //       },
  //     ]
  //   } as AngularEditorConfig;
  // }

  public static groupBy<T, K>(list: T[], getKey: (item: T) => K) {
    const map = new Map<K, T[]>();
    list.forEach((item) => {
      const key = getKey(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Array.from(map.values());
  }

} /// Utilities Class
