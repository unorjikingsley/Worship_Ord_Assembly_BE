import {
  UnauthenticatedError,
  UnauthorizedError,
  // BadRequestError,
} from '../errors/CustomError.js'
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = (req, res, next) => {

  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication failed');
};

export const authorizePermissions = (...role) => {
  return (req, res, next) => {
    if(!role.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next();
  }
};
