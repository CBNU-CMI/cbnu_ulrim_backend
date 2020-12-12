/* External dependencies */
import express from 'express'

/* Internal dependencies */
import { getPetitions, getPetition, createPetition, deletePetition } from './petition'
import { verifyToken } from 'routes/middlewares/verifyToken'

const router = express.Router()

router.get('/', getPetitions)
router.get('/:petitionId', getPetition)
router.post('/', verifyToken, createPetition)
router.delete('/:petitionId', verifyToken, deletePetition)

export default router
