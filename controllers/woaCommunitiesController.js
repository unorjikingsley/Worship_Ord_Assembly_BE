import prisma from '../DB/db.config.js';
import { StatusCodes } from 'http-status-codes';

export const createWOACommunities = async (req, res) => {
  try {
    const { full_Name, email, phone_Number, communities, reasons } = req.body

    if (!full_Name || !email || !phone_Number) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const community = await prisma.wOA_Community.create({
      data: {
        full_Name,
        email,
        phone_Number,
        communities,
        reasons,
      },
    })

    // return res.status(200).json({ data:community, msg:"A form is added"  });
    res.status(StatusCodes.CREATED).json({ community })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllCommunity = async (req, res) => {
  try {
    const communities = await prisma.wOA_Community.findMany({})
    // res.status(200).json({ data: communities })
    res.status(StatusCodes.OK).json({ communities })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getACommunity = async (req, res) => {
  try {
    const woa_community = await prisma.wOA_Community.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!woa_community) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Community form not found' })
    }

    res.status(StatusCodes.OK).json({ woa_community })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params
    const parsedId = parseInt(id)

    // Check if the community with the provided ID exists
    const existingCommunity = await prisma.wOA_Community.findUnique({
      where: { id: parsedId },
    })

    // If the community doesn't exist, return a 404 Not Found response
    if (!existingCommunity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Community not found' })
    }

    const updatedData = { ...req.body }

    // Perform the update operation on the community data here
    // For example:
    const updatedCommunity = await prisma.wOA_Community.update({
      where: { id: parsedId },
      data: updatedData,
    });

    console.log('updated communities:', updatedCommunity)

    // Return a success response with the updated community data
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Community modified', community: updatedCommunity })
  } catch (error) {
    // If any error occurs during the update process, return a 500 Internal Server Error response
    console.error('Error:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const deletedWoaCommunities = async (req, res) => {
  try {
    const deletedCommunity = await prisma.wOA_Community.findUnique({
      where: { id: parseInt(req.params.id) },
    })

    if (!deletedCommunity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Community not found' })
    }

    await prisma.wOA_Community.delete({
      where: { id: parseInt(req.params.id) },
    })

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Community deleted', communities: deletedCommunity })
  } catch (error) {
    console.error('Error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}

