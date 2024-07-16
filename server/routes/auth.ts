import express from 'express';
import { signIn } from '../controllers/auth';

const router = express.Router()


router.route('/sign-in').post(signIn)

export default router