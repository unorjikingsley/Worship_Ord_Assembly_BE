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
    // console.log('user:', user);

    const userWithoutPassword = { ...user } // Copy user object to remove password field
    // console.log('userPassword:', userWithoutPassword);
    delete userWithoutPassword.password // Remove password field from user object
    console.log('userWithoutPassword:', userWithoutPassword);

    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params
//     const parsedId = parseInt(id)

//     const existingUser = await prisma.user.findUnique({
//       where: { id: parseInt(id) },
//     })

//     if (!existingUser) {
//       return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
//     }

//     const updatedData = { ...req.body }
//     const updatedUser = await prisma.user.update({
//       where: { id: parsedId },
//       data: updatedData,
//     })

//     res.status(StatusCodes.OK).json({ user: updatedUser })
//   } catch (error) {
//     console.error('Error:', error)
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: 'Internal Server Error' })
//   }
// }

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

    // Remove id from updatedData to prevent accidental update of id field
    delete updatedData.id

    const updatedUser = await prisma.user.update({
      where: { id: parsedId },
      data: updatedData,
    })

    res.status(StatusCodes.OK).json({ user: updatedUser })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

