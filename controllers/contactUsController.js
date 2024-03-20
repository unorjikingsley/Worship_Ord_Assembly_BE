import prisma from '../DB/db.config.js';
import { StatusCodes } from 'http-status-codes';

export const createContactUsForm = async (req, res) => {
  try {
    const { first_Name, last_Name, email, phone_Number, descriptions } = req.body

    if (!first_Name || !last_Name || !email || !phone_Number || !descriptions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contactForm = await prisma.contactUsModel.create({
      data: {
        ...req.body,
      },
    })
    // console.log('contactForm:', contactForm);
    res.status(StatusCodes.CREATED).json({ contactForm })

  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllcontactUsForm = async (req, res) => {
  try {
    const contactForm = await prisma.contactUsModel.findMany({})
    res.status(StatusCodes.OK).json({ contactForm })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
