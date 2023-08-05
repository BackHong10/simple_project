import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const IsLoggedIn : RequestHandler = async (req,res,next) => {
    console.log(req.headers.cookie)
    const accessToken = req.headers.cookie?.split(" ")[1]
    
    if(!accessToken){
        return res.send("토큰이 존재하지 않습니다.")
    }
    let validToken = null


    jwt.verify(accessToken!,process.env.accessToken!, async (error, decoded) => {
        if(error){
            return res.send(error)
        }
        validToken = decoded
    })

    if(!validToken){
        return res.send("유효한 토큰이 아닙니다.")
    }
    console.log(validToken)

    User.findOne({
        where: {
            email: validToken['email'] 
        }
    }).then((user) => {
        res.locals.user = user
        next()
    }).catch((err) => {
        return res.send(err)
    })


    
}