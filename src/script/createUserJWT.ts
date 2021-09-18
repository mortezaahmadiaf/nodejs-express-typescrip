import * as jwt from 'jsonwebtoken'

export const createUserJWT = (userInfo: object): string => {
  let token = jwt.sign({
    ...userInfo
  }, process.env.JWT_TOKEN_SECURE_STRING, {
    algorithm: 'HS384',
    expiresIn: `${process.env.JWT_VALIDITY_DAY}d`,
    issuer: 'real_estate'
  });
  return token
}