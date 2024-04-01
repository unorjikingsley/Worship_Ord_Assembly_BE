import {
  UnauthenticatedError,
  UnauthorizedError,
  // BadRequestError,
} from '../errors/CustomError.js'
import { verifyJWT } from "../utils/tokenUtil.js";

export const authenticateUser = (req, res, next) => {
  // console.log(req.cookies);

  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication failed');
  
  try {
    const { id, role } = verifyJWT(token);
    // console.log(user);
    req.user = { id, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed');
  };
};

export const authorizePermissions = (...role) => {
  return (req, res, next) => {
    // console.log(roles);
    if(!role.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next();
  }
};
