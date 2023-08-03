import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes,Model } from 'sequelize'

import Post from './post'


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id : CreationOptional<number>
    declare email: string
    declare password : string
    declare createdAt : CreationOptional<Date>
    declare updatedAt : CreationOptional<Date>
    declare deletedAt : CreationOptional<Date>

    static initiate(sequelize: Sequelize.Sequelize){
        User.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type : Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        },{
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }
    static associate(){
        User.belongsTo(Post)
    }
}

export default User