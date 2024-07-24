import express from 'express';
import { googleLogin, signIn, signUp } from '../controllers/auth';

const router = express.Router()


router.route('/sign-up').post(signUp)
router.route('/sign-in').post(signIn)
router.route('/google').post(googleLogin)

export default router