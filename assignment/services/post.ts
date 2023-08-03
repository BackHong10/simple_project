
import Post from '../models/post'
import User from '../models/user'


export const createPostService = async (content: string, userId : number) => {
    try {
        await Post.create({
            content: content,
            UserId: userId
        })

        return 'success'
    } catch (error) {
        console.log(error)
        return 'error'
    }

}

export const updatePostService = async (content: string, userId: number,postId : number) => {
    try {
        const post = await Post.findOne({
            where: {
                id: postId
            },
            include: [
                {
                    model: User,
                    attributes: ['id']
                }
            ]
        })

        if(post?.UserId !== userId){
            return 'different UserId'
        }

        await Post.update({content: content}, {where: {id: postId}})
        return 'success'
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

export const deletePostService = async (postId: number, userId: number) => {

    try {
        const post = await Post.findOne({
            where: {
                id: postId
            },
            include: [
                {
                    model: User,
                    attributes: ['id']
                }
            ]
        })
    
        if(post?.UserId !== userId){
            return 'different UserId'
        }
    
        await Post.destroy({where: {
            id: postId
        }})
        return 'success'
    } catch (error) {
        console.log(error)
        return 'error'
    }

}

export const readAllPostService = async (page: number,limit: number) => {
    const post = await Post.findAll({
        offset: page ? (page-1)*limit : 0,
        limit: limit
    })

    return post
}

export const readPostServiceById = async (postId: number) => {
    const post = await Post.findOne({
        where: {
            id: postId
        }
    })

    return post
}