export const ERRORS = {
  FORBIDDEN: '',
  INVALID_DATA: '',
  SYSTEM_ERROR: '',
  INVALID_PARAMETER: '',
  INCOMPREHENSIBLE_MESSAGE: '',
  RESOURCE_NOT_FOUND: '',
  BUSINESS_ERROR: '',
};

export { default as ForbiddenError } from './Forbidden.error';
export { default as InvalidDataError } from './InvalidData.error';
export { default as SystemError } from './System.error';
export { default as ResourceNotFoundError } from './ResourceNotFound.error';
export { default as BusinessError } from './Business.error';
export { default as GenericError } from './Generic.error';
