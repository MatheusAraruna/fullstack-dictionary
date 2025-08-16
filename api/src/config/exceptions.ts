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
  badRequest: {
    errKey: 'badRequest',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'Requisição inválida',
    status: HttpStatus.BAD_REQUEST,
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
  userInvalidUserId: {
    errKey: 'userInvalidUserId',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'ID do usuário inválido',
    status: HttpStatus.BAD_REQUEST,
  },

  // history
  historyNotFound: {
    errKey: 'historyNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Nenhum registro encontrado',
    status: HttpStatus.NOT_FOUND,
  },
  historySaveError: {
    errKey: 'historySaveError',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'Erro ao salvar historico',
    status: HttpStatus.BAD_REQUEST,
  },
  historyInvalidUserId: {
    errKey: 'historyInvalidUserId',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'ID do usuário inválido',
    status: HttpStatus.BAD_REQUEST,
  },
  historyInvalidWordId: {
    errKey: 'historyInvalidWordId',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'ID da palavra inválido',
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

  // Favorite
  favoriteNotFound: {
    errKey: 'favoriteNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Sem registros de favoritos',
    status: HttpStatus.NOT_FOUND,
  },
  favoriteError: {
    errKey: 'wordFavoriteError',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'Erro ao favoritar a palavra',
    status: HttpStatus.BAD_REQUEST,
  },
  unfavoriteError: {
    errKey: 'wordUnfavoriteError',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'Erro ao desfavoritar a palavra',
    status: HttpStatus.BAD_REQUEST,
  },
  favoriteAlreadyExist: {
    errKey: 'favoriteAlreadyExist',
    message: exceptionMessages.BAD_REQUEST,
    friendlyMessage: 'Palavra já marcada como favorita',
    status: HttpStatus.BAD_REQUEST,
  },
} as const;
