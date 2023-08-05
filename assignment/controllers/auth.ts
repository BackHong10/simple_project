import { RequestHandler } from "express";
import {joinService,loginService} from '../services/auth'
export const join : RequestHandler= async (req,res,next) => {
    const result = await joinService(req.body.email, req.body.password)

    if(!result){
        return res.send('회원가입 실패')
    }

    return res.json({
        msg: 'success',
        result : result
    })
}

export const login : RequestHandler= async (req,res,next) => {
    console.log(req.body.email, req.body.password)
    const result = await loginService(req.body.email, req.body.password)

    if(result === 'nonValid user'){
        return res.send('입력하신 정보를 다시 확인해주세요')
    }

    if(result === 'different password'){
        return res.send('입력하신 정보를 다시 확인해주세요')
    }
    return res.json({
        msg: 'success',
        accessToken : result
    })

}