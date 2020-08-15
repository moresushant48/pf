

export class ErrorMessages {

  constructor(public propertyName: string,
              public errorMessage: string,
              public httpStatus: number = 200) {
  }
}
