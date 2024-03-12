import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from '../middleware/multerMiddleware.js';

export const createTestimonyForm = async (req, res) => {
  try {
    const {
      first_Name,
      last_Name,
      email,
      phone_Number,
      title,
      testimony,
      accept,
    } = req.body

    if (
      !first_Name ||
      !last_Name ||
      !email ||
      !phone_Number ||
      !testimony
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    let avatarUrl = '';

    if (req.file) {
      const imageInfo = formatImage(req.file)

      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageInfo.path
      )

      avatarUrl = cloudinaryResponse.secure_url

      await fs.unlink(imageInfo.path)
    }

    const testimonyForm = await prisma.testimonyForm.create({
      data: {
        first_Name,
        last_Name,
        email,
        phone_Number,
        title,
        testimony,
        accept,
        avatar: avatarUrl,
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
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
