import { Model, DataTypes } from 'sequelize'
import sequelize from '../../config/connectToDatabasePostgresql'

export class Profile extends Model {
    public id !: string;
    public userId !: string;
    public firstName !: string;
    public lastName !: string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;

    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined

        }
    }
} Profile.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    }

}, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profile'
});

export interface ProfileI {
    id?: string,
    userId?: string,
    firstName: string,
    lastName: string

}
// Profile.sync({ force: true }).then(() => console.log("Profile table created"));

