import CustomError, { ErrorType } from '../../types/CustomError';

export default class BusinessError extends CustomError {
  static type = 'BusinessError' as ErrorType;
}
