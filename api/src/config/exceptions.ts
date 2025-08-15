import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { exceptionMessages } from './exceptionMessages';

export const exceptions = {
  // Not found
  userNotFound: {
    errKey: 'userNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Usuário não encontrado',
    status: HttpStatus.NOT_FOUND,
  },
  entityNotFound: {
    errKey: 'entityNotFound',
    message: exceptionMessages.NOT_FOUND,
    friendlyMessage: 'Entidade não encontrada',
    status: HttpStatus.NOT_FOUND,
  },
} as const;
