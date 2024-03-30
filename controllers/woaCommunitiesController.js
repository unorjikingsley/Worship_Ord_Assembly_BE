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

    res.status(StatusCodes.CREATED).json({ community })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllCommunity = async (req, res) => {
  try {
    const communities = await prisma.wOA_Community.findMany({})
    res.status(StatusCodes.OK).json({ communities })
  } catch (error) {
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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const updateCommunity = async (req, res) => {
  try {
    const { id } = req.params
    const parsedId = parseInt(id)

    const existingCommunity = await prisma.wOA_Community.findUnique({
      where: { id: parsedId },
    })

    if (!existingCommunity) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Community not found' })
    }

    const updatedData = { ...req.body }

    const updatedCommunity = await prisma.wOA_Community.update({
      where: { id: parsedId },
      data: updatedData,
    });

    res
      .status(StatusCodes.OK)
      .json({ msg: 'Community modified', community: updatedCommunity })
  } catch (error) {
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
    })
  }
}

