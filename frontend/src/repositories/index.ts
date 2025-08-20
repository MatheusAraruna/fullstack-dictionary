import { AuthRepository } from './auth';
import { WordRepository } from './word';

export const repository = {
  auth: new AuthRepository(),
  word: new WordRepository()
};