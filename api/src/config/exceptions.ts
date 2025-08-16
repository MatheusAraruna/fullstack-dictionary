import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { exceptionMessages } from './exceptionMessages';

export const exceptions = {
  // Commons
  entityNotFound: {
    errKey: 'entityNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Entidade não encontrada',
    status: HttpStatus.NOT_FOUND,
  },

  // User
  userNotFound: {
    errKey: 'userNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Usuário não encontrado',
    status: HttpStatus.NOT_FOUND,
  },
  userAlreadyExists: {
    errKey: 'userAlreadyExists',
    message: exceptionMessages.ALREADY_EXISTS,
    friendlyMessage: 'Usuário já existe',
    status: HttpStatus.CONFLICT,
  },
  userNotAuthorized: {
    errKey: 'userNotAuthorized',
    message: exceptionMessages.UNAUTHORIZED_ERROR,
    friendlyMessage: 'Usuário não autorizado',
    status: HttpStatus.UNAUTHORIZED,
  },
  userInvalidCredentials: {
    errKey: 'userInvalidCredentials',
    message: exceptionMessages.UNAUTHORIZED_ERROR,
    friendlyMessage: 'Credenciais inválidas',
    status: HttpStatus.UNAUTHORIZED,
  },
  userInvalidEmail: {
    errKey: 'userInvalidEmail',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'E-mail inválido',
    status: HttpStatus.BAD_REQUEST,
  },
  userPasswordTooWeak: {
    errKey: 'userPasswordTooWeak',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage:
      'A senha deve ter pelo menos 8 caracteres, incluindo letras e números',
    status: HttpStatus.BAD_REQUEST,
  },

  // Words
  wordNotFound: {
    errKey: 'wordNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Palavra não encontrada',
    status: HttpStatus.NOT_FOUND,
  },
  wordBadRequest: {
    errKey: 'wordBadRequest',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'Requisição inválida para a palavra',
    status: HttpStatus.BAD_REQUEST,
  },
  wordsNotFound: {
    errKey: 'wordsNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Palavras não encontradas',
    status: HttpStatus.NOT_FOUND,
  },
} as const;
