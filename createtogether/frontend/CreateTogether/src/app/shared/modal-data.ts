
export interface IModalDataInput<T> {
  title: string;
  formData: T;
  optionalData: any;
}

export interface IModalDataOutput<T> {
  save: boolean;
  data: T;
  successMessage: string;
}
