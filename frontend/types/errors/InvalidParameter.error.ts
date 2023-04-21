import CustomError, { ErrorType } from '../../types/CustomError';

export default class InvalidParameterError extends CustomError {
  static type = 'InvalidParameterError' as ErrorType;
}
