//example code for JWT utils, to be replaced with actual JWT utils


/**import {jwtDecode} from 'jwt-decode';
import {MMKVStorage} from '../config/MMKVStorageConfig';

export type DecodedTokenType = {
    exp: number;
    iat: number;
    id: string;
}
export const getDecodedTokenPayload = () => {
  try {
    const token = MMKVStorage.getToken();
    if (!token) return null;
    const decodedToken: DecodedTokenType = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
    const decoded = getDecodedTokenPayload();
    if (!decoded || !decoded.exp) return true;
     return decoded.exp * 1000 < Date.now();
  };
 */