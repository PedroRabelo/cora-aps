import CustomError, { ErrorType } from '../../types/CustomError';

export default class ForbiddenError extends CustomError {
  static type = 'ForbiddenError' as ErrorType;
}
