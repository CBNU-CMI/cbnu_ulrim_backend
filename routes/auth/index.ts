/* External dependencies */
import express from 'express'

/* Internal dependencies */
import { signup, signin, signout, isLoggedIn } from './auth'
import { verifyToken } from 'routes/middlewares/verifyToken'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/isLoggedIn', verifyToken, isLoggedIn)

export default router
