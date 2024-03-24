import prisma from '../DB/db.config.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';

export const createTestimonyForm = async (req, res) => {
  try {

    // console.log('Incoming request body:', req.body) // Log request body
    // console.log('Uploaded file:', req.file) // Log uploaded file

    const user = { ...req.body }

    if (req.file) {
      const imageInfo = formatImage(req.file)

      const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageInfo)

      user.avatar = cloudinaryResponse.secure_url
      user.avatarPublicId = cloudinaryResponse.public_id
    }

    const testimonyForm = await prisma.testimonyForm.create({
      data: {
        ...user,
      },
    })

    res.status(StatusCodes.CREATED).json({ testimonyForm })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllTestimonyForm = async (req, res) => {
  try {
    const testimonyForms = await prisma.testimonyForm.findMany({})
    res.status(StatusCodes.OK).json({ testimonyForms })
  } catch (error) {
    // console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getTestimonyForm = async (req, res) => {
  try {
    const testimonyForm = await prisma.testimonyForm.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!testimonyForm) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Testimony form not found' })
    }

    res.status(StatusCodes.OK).json({ testimonyForm })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const updateTestimonyForm = async (req, res) => {
  try {
    const { id } = req.params
    const parsedId = parseInt(id)

    if (isNaN(parsedId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid ID' })
    }

    const existingTestimony = await prisma.testimonyForm.findUnique({
      where: { id: parsedId },
    })

    if (!existingTestimony) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Testimony not found' })
    }

    const updatedData = { ...req.body }

    if (req.file) {
      const imageInfo = formatImage(req.file)
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(imageInfo)
      updatedData.avatar = cloudinaryResponse.secure_url
      updatedData.avatarPublicId = cloudinaryResponse.public_id
    } else {
      // If no new image is uploaded, retain the existing image URL
      updatedData.avatar = existingTestimony.avatar
      updatedData.avatarPublicId = existingTestimony.avatarPublicId
    }

    // Convert 'accept' field to boolean
    if ('accept' in updatedData) {
      updatedData.accept = updatedData.accept === 'true'
    }

    const updatedTestimony = await prisma.testimonyForm.update({
      where: { id: parsedId },
      data: updatedData,
    })

    console.log('updated Testimony:', updatedTestimony)

    // Delete previous image from Cloudinary if a new one was uploaded
    if (req.file && existingTestimony.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(existingTestimony.avatarPublicId)
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Testimony modified', updatedTestimony })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}


export const deleteTestimonyForm = async (req, res) => {
  try {
    const deletedTestimony = await prisma.testimonyForm.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!deletedTestimony) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Testimony not found' })
    }

    await prisma.testimonyForm.delete({
      where: { id: parseInt(req.params.id) },
    })

    if (deletedTestimony.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(deletedTestimony.avatarPublicId)
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Testimony deleted', testimony: deletedTestimony })
  } catch (error) {
    console.error('Error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}
