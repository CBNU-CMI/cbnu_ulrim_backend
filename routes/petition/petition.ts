/* External dependencies */
import { Request, Response, NextFunction, response } from 'express'
import { Sequelize, Op } from 'sequelize'
import dotenv from 'dotenv'
import _ from 'lodash'

/* Internal dependencies */
import { Petition, User, Agree, PetitionFile } from 'models'
import { FieldType } from 'routes/middlewares/upload'

dotenv.config()

export const getPetitions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const petitions = await Petition.findAll({
      where: {
        dueDate: {
          [Op.gt]: Sequelize.fn('NOW'),
        },
      },
      attributes: {
        exclude: ['content'],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    })

    return res.send(petitions)
  } catch (error) {
    return next(error)
  }
}

export const getPetition = async (req: Request, res: Response, next: NextFunction) => {
  const { petitionId } = req.params

  try {
    const petition = await Petition.findOne({
      where: { id: petitionId },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: PetitionFile,
        },
      ],
    })

    if (_.isNil(petition)) {
      const error: any = new Error('cannot find petition.')
      error.status = 404
      throw error
    }

    return res.send(petition)
  } catch (error) {
    return next(error)
  }
}

export const createPetition = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.decoded
  const { title, category, content, dueDate } = req.body
  const { images } = req.files as FieldType

  try {
    const newPetition = await Petition.create({
      userId: parseInt(userId),
      title,
      category,
      content,
      dueDate,
    })

    await Promise.all(images.map(({ filename }) => (
      PetitionFile.create({
        petitionId: newPetition.id,
        url: `/image/${filename}`,
      })
    )));
    
    const petition = await Petition.findOne({
      where: { id: newPetition.id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
        {
          model: PetitionFile,
        },
      ],
    })

    if (_.isNil(petition)) {
      const error: any = new Error('cannot find petition.')
      error.status = 404
      throw error
    }

    return res.send(petition)
  } catch (error) {
    return next(error)
  }
}

export const deletePetition = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.decoded
  const { petitionId } = req.params

  try {
    const willDeletePetition = await Petition.findByPk(petitionId)

    if (_.isNil(willDeletePetition)) {
      const error: any = new Error('cannot find petition.')
      error.status = 404
      throw error
    }

    if (willDeletePetition.userId !== parseInt(userId)) {
      const error: any = new Error("you don't have authority to delete this petition")
      error.status = 401
      throw error
    }
    
    await Petition.destroy({ where: { id: petitionId } })

    return res.send(willDeletePetition)
  } catch (error) {
    return next(error)
  }
}

export const getOwnAgrees = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.decoded

  try {
    const agrees = await Agree.findAll({ where: { userId }})
    return res.send(agrees)
  } catch (error) {
    return next(error)
  }
}

export const createAgree = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.decoded
  const { petitionId } = req.body

  try {
    await Agree.create({
      userId: parseInt(userId),
      petitionId,
    })

    return res.send()
  } catch (error) {
    return next(error)
  }
}
