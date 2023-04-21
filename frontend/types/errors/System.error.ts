import CustomError, { ErrorType } from '../../types/CustomError';

export default class SystemError extends CustomError {
  static type = 'SystemError' as ErrorType;
}
