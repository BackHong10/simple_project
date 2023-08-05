import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UniqueConstraintError } from 'sequelize'


export const joinService = async (email: string,password: string): Promise<User> => {
    
    const hashedPassword = await bcrypt.hash(password,10)
    
    
    
    const result = await User.create({
        email,
        password: hashedPassword
    })
    return result


}

export const loginService = async (email: string,password: string) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if(!user){
        return 'nonValid user'
    }

    const comparePassword = await bcrypt.compare(password, user!.password)

    if(!comparePassword){
        return 'different password'
    }

    const accessToken = jwt.sign({email: user.email, sub: user.id?.toString()},process.env.accessToken!, {
        expiresIn: '1h'
    }
      )
    return accessToken
}