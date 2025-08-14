export const auth = {
  secret: process.env.SECRETKEY,
  expirein: process.env.EXPIREIN || '60d', // Default expiration time
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};
