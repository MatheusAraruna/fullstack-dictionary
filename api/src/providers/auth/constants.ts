export const jwtConstants = {
  secret: process.env.SECRETKEY,
  expirein: process.env.EXPIREIN || '60d', // Default expiration time
};
