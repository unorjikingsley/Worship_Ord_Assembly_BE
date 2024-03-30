import prisma from '../DB/db.config.js';
import { StatusCodes } from 'http-status-codes';

export const getCurrentUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password 

    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const parsedId = parseInt(id)

    const existingUser = await prisma.user.findUnique({
      where: { id: parsedId },
    })

    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
    }

    const updatedData = { ...req.body }

    delete updatedData.id

    const updatedUser = await prisma.user.update({
      where: { id: parsedId },
      data: updatedData,
    })

    res.status(StatusCodes.OK).json({ user: updatedUser })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

