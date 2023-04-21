import CustomError, { ErrorType } from '../../types/CustomError';

export default class ResourceNotFoundError extends CustomError {
  static type = 'ResourceNotFOundError' as ErrorType;
}
