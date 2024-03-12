import prisma from '../DB/db.config.js'
import { StatusCodes } from 'http-status-codes'

export const createPrayerForm = async (req, res) => {
  try {
    const { first_Name, last_Name, email, phone_Number, prayerRequest } = req.body

    if (!first_Name || !last_Name || !email || !phone_Number || !prayerRequest) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const prayerForm = await prisma.prayerForm.create({
      data: {
        first_Name,
        last_Name,
        email,
        phone_Number,
        prayerRequest,
      },
    })

    res.status(StatusCodes.CREATED).json({ prayerForm })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllPrayerForm = async (req, res) => {
  try {
    const prayerForms = await prisma.prayerForm.findMany({})
    res.status(StatusCodes.OK).json({ prayerForms })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
