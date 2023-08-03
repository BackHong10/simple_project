import {createPost,deletePost,updatePost,readPost,readPostById} from '../controllers/post'
import express from 'express'

export const router = express.Router()


router.post('/',createPost)
router.patch('/:id/update',updatePost)
router.delete('/:id/delete', deletePost)
router.get('/:id', readPostById)
router.get('/',readPost)

export default router

