import CustomError, { ErrorType } from '../../types/CustomError';

export default class InvalidDataError extends CustomError {
  static type = 'InvalidDataError' as ErrorType;
}
