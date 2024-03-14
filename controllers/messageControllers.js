import prisma from '../DB/db.config.js'
import { StatusCodes } from 'http-status-codes'
import cloudinary from 'cloudinary'
import { formatImage } from '../middleware/multerMiddleware.js'

export const createMessage = async (req, res) => {
  try {
    const user = { ...req.body }

    // Parse the duration string to an integer
    user.duration = parseInt(user.duration)

    if (req.file) {
      const imageInfo = formatImage(req.file)
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageInfo)

      user.image = cloudinaryResponse.secure_url
      user.imagePublicId = cloudinaryResponse.public_id
    }

    const message = await prisma.message.create({
      data: {
        ...user,
      },
    })

    res.status(StatusCodes.CREATED).json({ message })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({})
    res.status(StatusCodes.OK).json({ messages })
  } catch (error) {
    // console.error('Error:', error
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getMessage = async (req, res) => {
  try {
    const message = await prisma.message.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!message) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Message form not found' })
    }

    res.status(StatusCodes.OK).json({ message })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid ID' })
    }

    // console.log('parsedId:', parsedId)

    const existingMessage = await prisma.message.findUnique({
      where: { id: parsedId },
    })

    if (!existingMessage) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Message not found' })
    }

    const updatedData = { ...req.body }
    updatedData.duration = parseInt(req.body.duration)


    // console.log('updatedData:', updatedData)

    // console.log('req file:', req.file)

    // Check if there's a file uploaded
    if (req.file) {
      const imageInfo = formatImage(req.file)
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageInfo)
      updatedData.image = cloudinaryResponse.secure_url
      updatedData.imagePublicId = cloudinaryResponse.public_id
    }

    const updatedMessage = await prisma.message.update({
      where: { id: parsedId },
      data: updatedData,
    })

    console.log('updated Message:', updatedMessage)

    // Delete previous image from Cloudinary if a new one was uploaded
    if (req.file && existingMessage.imagePublicId) {
      await cloudinary.v2.uploader.destroy(existingMessage.imagePublicId)
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Message modified', updatedMessage })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await prisma.message.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!deletedMessage) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Message not found' })
    }

    await prisma.message.delete({
      where: { id: parseInt(req.params.id) },
    })

    if (deletedMessage.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(deletedMessage.avatarPublicId)
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Message deleted', message: deletedMessage })
  } catch (error) {
    console.error('Error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}
