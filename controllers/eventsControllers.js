import prisma from '../DB/db.config.js'
import { StatusCodes } from 'http-status-codes'
import cloudinary from 'cloudinary'
import { formatImage } from '../middleware/multerMiddleware.js'

export const createEvents = async (req, res) => {
  try {
    const user = { ...req.body }

    if (req.file) {
      const imageInfo = formatImage(req.file)
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageInfo)

      user.image = cloudinaryResponse.secure_url
      user.imagePublicId = cloudinaryResponse.public_id
    }

    const event = await prisma.events.create({
      data: {
        ...user,
      },
    })

    res.status(StatusCodes.CREATED).json({ event })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.events.findMany({})
    res.status(StatusCodes.OK).json({ events })
  } catch (error) {
    // console.error('Error:', error
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getEvent = async (req, res) => {
  try {
    const event = await prisma.events.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!event) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Event form not found' })
    }

    res.status(StatusCodes.OK).json({ event })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid ID' })
    }

    // console.log('parsedId:', parsedId)

    const existingEvent = await prisma.events.findUnique({
      where: { id: parsedId },
    })

    if (!existingEvent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Events not found' })
    }

    const updatedData = { ...req.body }

    // console.log('updatedData:', updatedData)

    // console.log('req file:', req.file)

    // Check if there's a file uploaded
    if (req.file) {
      const imageInfo = formatImage(req.file)
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageInfo)
      updatedData.image = cloudinaryResponse.secure_url
      updatedData.imagePublicId = cloudinaryResponse.public_id
    } else {
      // If no new image is uploaded, retain the existing image URL
      updatedData.image = existingEvent.image
      updatedData.imagePublicId = existingEvent.imagePublicId
    }

    const updatedEvent = await prisma.events.update({
      where: { id: parsedId },
      data: updatedData,
    })

    console.log('updated events:', updatedEvent)

    // Delete previous image from Cloudinary if a new one was uploaded
    if (req.file && existingEvent.imagePublicId) {
      await cloudinary.v2.uploader.destroy(existingEvent.imagePublicId)
    }

    res.status(StatusCodes.OK).json({ msg: 'Event modified', updatedEvent })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await prisma.events.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!deletedEvent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Events not found' })
    }

    await prisma.events.delete({
      where: { id: parseInt(req.params.id) },
    })

    if (deletedEvent.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(deletedEvent.imagePublicId)
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Event deleted', event: deletedEvent })
  } catch (error) {
    console.error('Error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}
