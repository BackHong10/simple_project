import Sequelize from 'sequelize'
import configObj from '../config/config'
import User from './user'
import Post from './post'


const env = process.env.Node as 'production' | 'test' || 'development'
const config = configObj[env]

export const sequelize = new Sequelize.Sequelize(config.database,config.username, config.password, config)

User.initiate(sequelize)
Post.initiate(sequelize)

User.associate()
Post.associate()

export {User,Post}
