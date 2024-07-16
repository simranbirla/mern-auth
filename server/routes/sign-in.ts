import express from 'express';
import { createSignIn } from '../controllers/sign-in';

const router = express.Router()


router.route('/').get(createSignIn)

export default router