import CustomError, { ErrorType } from '../../types/CustomError';

export default class GenericError extends CustomError {
  static type = 'GenericError' as ErrorType;
}
