import { lib, PBKDF2 } from 'crypto-js'
// generate a string by crypto pakage by takes string length
export const genRandomString = ({ stringLength }): string => {
  return lib.WordArray.random(stringLength / 2).toString()  /** return required number of characters */
};
// encrypt password with a random string 
export const encription = ({ password, salt }): string => {
  let hash = PBKDF2(password, salt).toString()
  return hash
}
