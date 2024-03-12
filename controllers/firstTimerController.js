import prisma from '../DB/db.config.js';
import { StatusCodes } from 'http-status-codes';

export const createFirstTimer = async (req, res) => {
  try {
    const { first_Name, last_Name, email, phone_Number, inviter, location, prayerRequest } = req.body

    if (!first_Name || !last_Name || !email || !phone_Number) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const firstTimer = await prisma.firstTimer.create({
      data: {
        first_Name,
        last_Name,
        email,
        phone_Number,
        inviter,
        location,
        prayerRequest,
      },
    })
    res.status(StatusCodes.CREATED).json({ firstTimer })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllFirstTimers = async (req, res) => {
  try {
    const firstTimers = await prisma.firstTimer.findMany({})
    res.status(StatusCodes.OK).json({ firstTimers })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
