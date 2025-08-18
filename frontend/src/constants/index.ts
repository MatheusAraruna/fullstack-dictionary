export const ONE_MINUTE_IN_SECONDS = 60;
export const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
export const ONE_HOUR_IN_SECONDS = 60 * 60;

export const ONE_DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;

export const headersDictionary = {
  accessToken: 'dictionary-auth-token',
  refreshToken: 'dictionary-auth-refresh-token',
} as const;

export const regexPresets = {
  email: {
    value: 
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email inválido'
  },
  password: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'Senha inválida: a senha deve ter no mínimo 8 caracteres seguidos de letras e números'
  }
} as const
