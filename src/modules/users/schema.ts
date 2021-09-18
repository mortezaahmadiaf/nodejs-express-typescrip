import { Model, DataTypes, } from 'sequelize'
import sequelize from '../../config/connectToDatabasePostgresql'
import { Profile } from '../profile/schema';
export class Users extends Model {
    public id !: string;
    public phone !: number;
    public countryCode !: number;
    public salt !: string;
    public password !: string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;


    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined,
            password: undefined,
            salt: undefined
        }
    }
} Users.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    countryCode: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 4]
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users'
});
Users.hasOne(Profile, {
    foreignKey: 'userId',
    as: 'profile'
});

export interface UserI {
    id?: string,
    phone: number,
    countryCode: number,
    salt?: string,
    password: string,

}

export interface UserChangePasswordI {
    salt?: string
    password: string,
    id: string,
}



export interface PhoneI {
    countryCode: number,
    phone: number
}
export interface UpdateUserI {
    id: string,
    countryCode: number,
    phone: number
}


// Users.sync({ alter: true }).then(() => console.log("Users table created"));

