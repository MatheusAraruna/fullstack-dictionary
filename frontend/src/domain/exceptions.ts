import type { ApiError } from "@/types/api/common";

export const exceptionMessages = {
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error',
  NETWORK_ERROR: 'Network error',
} as const;

export const exceptions = {
  userNotFound: {
    errKey: 'userNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Usuário não encontrado',
  } satisfies ApiError,

  invalidCredentials: {
    errKey: 'invalidCredentials',
    message: exceptionMessages.UNAUTHORIZED,
    friendlyMessage: 'Credenciais inválidas',
  } satisfies ApiError,

  accessDenied: {
    errKey: 'accessDenied',
    message: exceptionMessages.FORBIDDEN,
    friendlyMessage: 'Acesso negado',
  } satisfies ApiError,

  networkError: {
    errKey: 'networkError',
    message: exceptionMessages.NETWORK_ERROR,
    friendlyMessage: 'Erro de conexão',
  } satisfies ApiError,

  internalError: {
    errKey: 'internalError',
    message: exceptionMessages.INTERNAL_ERROR,
    friendlyMessage: 'Erro interno do servidor',
  } satisfies ApiError,

  validationError: {
    errKey: 'validationError',
    message: exceptionMessages.VALIDATION_ERROR,
    friendlyMessage: 'Dados inválidos',
  } satisfies ApiError,
} as const;

export type ExceptionKey = keyof typeof exceptions;