import * as bcrypt from 'bcrypt';
import { auth } from 'src/providers/auth/constants';

export async function generateHash(value: string): Promise<string> {
  return await bcrypt.hash(value, auth.saltRounds);
}

export async function matchHash(value: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(value, hash);
}
