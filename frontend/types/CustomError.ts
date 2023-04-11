export type ErrorData = {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
};
export type ErrorType =
  | 'ForbiddenError'
  | 'InvalidDataError'
  | 'SystemError'
  | 'ResourceNotFoundError'
  | 'BusinessError'
  | 'GenericError';

class CustomError {
  static type: ErrorType;

  data?: ErrorData;

  constructor(data: ErrorData) {
    this.data = data;
  }
}

export default CustomError;
