import {createPost,deletePost,updatePost,readPost,readPostById} from '../controllers/post'
import express from 'express'
import {IsLoggedIn} from '../middlewares'

export const router = express.Router()


router.post('/',IsLoggedIn,createPost)
router.patch('/:id/update',IsLoggedIn,updatePost)
router.delete('/:id/delete', IsLoggedIn,deletePost)
router.get('/:id', IsLoggedIn,readPostById)
router.get('/',IsLoggedIn,readPost)

export default router

