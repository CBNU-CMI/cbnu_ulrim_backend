/* External dependencies */
import express from 'express'

/* Internal dependencies */
import {
  getPetitions,
  getPetition,
  createPetition,
  deletePetition,
  getOwnAgrees,
  createAgree,
} from './petition'
import { verifyToken } from 'routes/middlewares/verifyToken'
import upload from 'routes/middlewares/upload'

const router = express.Router()

router.get('/', getPetitions)
router.get('/:petitionId', getPetition)
router.post('/', verifyToken, upload.fields([{ name: 'images', maxCount: 15 }]), createPetition)
router.delete('/:petitionId', verifyToken, deletePetition)
router.get('/agree', verifyToken, getOwnAgrees)
router.post('/agree', verifyToken, createAgree)

export default router
