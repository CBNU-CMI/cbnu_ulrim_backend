/* External dependencies */
import express, { RequestHandler } from 'express'

/* Internal dependencies */
import { getPetitions, getPetition, createPetition, deletePetition } from './petition'
import { verifyToken } from 'routes/middlewares/verifyToken'
import upload from 'routes/middlewares/upload'

const router = express.Router()

router.get('/', getPetitions)
router.get('/:petitionId', getPetition)
router.post('/', verifyToken, upload.fields([{ name: 'images', maxCount: 15 }]), createPetition)
router.delete('/:petitionId', verifyToken, deletePetition)

export default router
