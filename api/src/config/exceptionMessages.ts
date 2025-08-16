export const exceptionMessages = {
  NOT_FOUND: 'Entity resource not found',
  NOT_EXIST: 'Entity resource does not exist',
  FORBIDDEN: 'You are not allowed to perform this action',
  BAD_REQUEST: 'Verify your request and try again',
  UNAUTHORIZED_ERROR: 'You are not authorized to perform this action',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  DELETE_CONFLICT: 'Entity resource is being used by other resources',
  FK_INVALID: 'Foreign key is invalid',
  INVALID_TOKEN: 'Invalid token',
  ALREADY_EXISTS: 'Entity resource already exists',
} as const;
