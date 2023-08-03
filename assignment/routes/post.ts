import {createPost,deletePost,updatePost} from '../controllers/post'
import express from 'express'

export const router = express.Router()


router.post('/',createPost)
router.patch('/:id/update',updatePost)
router.delete('/:id/delete', deletePost)

