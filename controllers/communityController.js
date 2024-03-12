import prisma from "../DB/db.config.js";
import { StatusCodes } from 'http-status-codes';

export const createCommunity = async (req, res) => {
  try {
    const { first_Name, last_Name, email, message, phone_Number } = req.body;

    if (!first_Name || !last_Name || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const community = await prisma.community.create({
      data: {
        first_Name,
        last_Name,
        email,
        message,
        phone_Number,
      },
    })

    // return res.status(200).json({ data:community, msg:"A form is added"  });
    res.status(StatusCodes.CREATED).json({ community })
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getAllCommunity = async (req, res) => {
  try {
    const communities = await prisma.community.findMany({})
    // res.status(200).json({ data: communities })
    res.status(StatusCodes.OK).json({ communities })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
