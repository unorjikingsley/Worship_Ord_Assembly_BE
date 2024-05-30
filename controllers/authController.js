import prisma from '../DB/db.config.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtil.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export const register = async (req, res) => {
  try {
    // Check if any users exist in the database
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: 'Registration not allowed. An Admin already exists.' })
      // throw new BadRequestError(
      //   'Registration not allowed. An Admin already exists.'
      // )
    }

    // Proceed with registration if no users exist
    req.body.role = 'user';

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword

    const user = await prisma.user.create({ data: req.body })
    res.status(StatusCodes.CREATED).json({ msg: user })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}


export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    })
    console.log('user found', user);

    const isValidUser =
      user && (await comparePassword(req.body.password, user.password))

    if (!isValidUser) throw new UnauthenticatedError('invalid credentials')

    const token = createJWT({ userId: user.id, role: user.role })
    console.log('token:', token)

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    })

    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    console.log('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
