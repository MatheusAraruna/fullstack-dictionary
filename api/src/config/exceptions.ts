import { exceptionMessages } from './exceptionMessages';

export const exceptions = {
  // Not found
  userNotFound: {
    errKey: 'userNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Usuário não encontrado',
  },
  entityNotFound: {
    errKey: 'entityNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Entidade não encontrada',
  },
} as const;
