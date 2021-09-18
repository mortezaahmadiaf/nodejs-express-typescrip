import {
    Users,
    UserI,
    UserChangePasswordI,
    PhoneI,
    UpdateUserI,
} from './schema';
import { Profile } from '../profile/schema';

export class UserModel {
    private user = Users;

    public async deleteUser(id: string, callback: any) {
        try {
            let res = await this.user.destroy({ where: { id } })
            callback(null, res);
        } catch (error) {
            callback(error, null);
        }
    }

    public async findUserById(id: string, callback: any) {
        try {
            let user: UserI = await this.user.findOne({ where: { id } })
            callback(null, user)
        } catch (error) {
        }
    }

    public async findUserByIdWithProfile(id: string, callback: any) {
        try {
            let user: UserI = await this.user.findOne({
                where: { id }, include: [
                    {
                        model: Profile,
                        as: 'profile'
                    }
                ]
            })
            callback(null, user)
        } catch (error) {
            callback(error)
        }
    }

    public async save(info: UserI, callback: any) {
        try {
            let result = await this.user.create(info)
            callback(null, result)
        } catch (error) {
            callback(error, null);
        }
    }

    public async update(info: UpdateUserI, callback: any) {
        try {
            let result, user = await this.user.findOne({ where: { id: info.id }, });
            result = await user.update(info)
            callback(null, result)
        } catch (error) {
            callback(error, null);
        }
    }

    public async findUserByPhoneWithProfile(phoneInfo: PhoneI, callback: any) {
        try {
            let user = await this.user.findOne({
                where: { ...phoneInfo },
                include: [
                    {
                        model: Profile,
                        as: 'profile'
                    }
                ]
            });
            callback(null, user)
        } catch (error) {
            callback(error, null);
        }
    }


    public async findUserByPhone(phoneInfo: PhoneI, callback: any) {
        try {
            let user = await this.user.findOne({
                where: { ...phoneInfo }
            });
            callback(null, user)
        } catch (error) {
            callback(error, null);
        }
    }
    public async findAll(callback: any) {
        try {
            let user = await this.user.findAll({
                include: [
                    {
                        model: Profile,
                        as: 'profile'
                    }
                ]
            });
            callback(null, user)
        } catch (error) {
            callback(error, null);
        }
    }

    public async updatePassword(info: UserChangePasswordI, callback: any) {
        try {
            let result, user = await this.user.findOne({ where: { id: info.id }, });
            result = await user.update(info)
            callback(null, result)
        } catch (error) {
            callback(error, null);
        }
    }


}
