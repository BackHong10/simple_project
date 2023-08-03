import express, { ErrorRequestHandler } from 'express'
import {sequelize} from './models'
import dotenv from 'dotenv'
import postRouter from './routes/post'
dotenv.config()
const app = express()

app.set('port', process.env.PORT || 3000)
sequelize.sync().then(() => {
    console.log('데이터베이스 연결에 성공하였습니다.')
})


app.use(express.json())
app.use(express.urlencoded())


app.use('/post', postRouter)


app.use((req,res,next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    next(err)
})

const errorHandler: ErrorRequestHandler = (err, req,res,next) => {
    res.send(err.message)
} 

app.use(errorHandler)

app.listen(app.get('port'), () => {
    console.log('서버가 실행되었습니다.')
})
