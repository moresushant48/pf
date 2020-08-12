import { ErrorMessages } from '../../../../../../../../../../../pf/eb/frontend/rs-admin/src/app/common/api/error.messages';

export interface INotificationType {
  type: 'success' | 'info' | 'primary' | 'danger';
  autoClose: boolean;
  message: string;
  autoCloseTimeout: number;
  errors: ErrorMessages[];
}

export interface IConfirmationType {
  message: string;
  type: 'success' | 'info' | 'primary' | 'danger';
  expectedResponse?: string;
  requiredResponse: boolean;
}

export interface IConfirmationResult {
  cancelled: boolean;
  response: string;
}
