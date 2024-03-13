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
  const testimonyForm = await prisma.testimonyForm.findById(req.params.id)
  res.status(StatusCodes.OK).json({ testimonyForm })
}

export const updateTestimonyForm = async (req, res) => {
  try {
    const updatedTestimonyForm = await prisma.testimonyForm.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    })

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Testimony modified', updatedTestimonyForm })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}


export const deleteTestimonyForm = async (req, res) => {
  try {
    const removedTestimony = await prisma.testimonyForm.delete({
      where: { id: parseInt(req.params.id) },
    })

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Testimony deleted', testimony: removedTestimony })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
