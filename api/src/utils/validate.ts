import { regexPresets } from 'src/config/constants';

export function isValidEmail(email: string): boolean {
  const emailRegex = regexPresets.email;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = regexPresets.password;
  return passwordRegex.test(password);
}
