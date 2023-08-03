import { RequestHandler,Request } from 'express'
import {createPostService,deletePostService,updatePostService,readAllPostService,readPostServiceById} from '../services/post'

export const createPost: RequestHandler = async (req,res,next) => {
    const result = await createPostService(req.body.content, req.user.id)

    if(result === 'error'){
        return res.send("error")
    }

    else if(result === 'success'){
        return res.send('게시물 등록 성공')
    }
}

export const updatePost: RequestHandler = async (req,res,next) => {
    const result = await updatePostService(req.body.content,res.locals.user.id,Number(req.params.id))

    if(result === 'different UserId'){
        return res.send("수정권한이 없습니다.")
    }
    else if(result === 'error'){
        return res.send('error')
    }
    else if(result === 'success'){
        return res.send('수정 성공')
    }
}

export const deletePost : RequestHandler = async (req,res,next) => {
    const result = await deletePostService(res.locals.user.id, Number(req.params.id))

    if(result === 'different UserId'){
        return res.send("삭제 권한이 없습니다.")
    }
    else if (result === 'error'){
        return res.send('error')
    }
    else if(result === 'success'){
        return res.send('삭제 성공')
    }
}

export const readPost : RequestHandler = async (req,res,next) => {
    const {num} = req.query.page
    const {limit} = req.query.limit
    const result = await readAllPostService(req.query.page.num , limit.num)
}