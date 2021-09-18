import { encription, genRandomString } from '../../script';
import { UserModel } from './model';
import { PhoneI, UserChangePasswordI, UserI, UpdateUserI } from './schema';

export class UserManager {
    private user: UserModel = new UserModel()
    //  ___________________________________________________________________________________________________________________________________
    public createUser(user_params: UserI) {
        return new Promise((resolve, reject) => {
            let salt = genRandomString({ stringLength: 15 })
            let hashPass = encription({ salt, password: user_params.password })
            user_params.salt = salt
            user_params.password = hashPass

            this.user.findUserByPhone({ countryCode: user_params.countryCode, phone: user_params.phone }, (er, res: UserI) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        reject({ error: "", errorMsg: 'This phone number exist' }) :
                        this.user.save(user_params, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: 'Database Error' }) :
                                resolve(res1)
                        })
            })
        })
    }
    public update(param: UpdateUserI) {
        return new Promise((resolve, reject) => {
            this.user.findUserByPhone(param, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        this.user.update(param, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: 'Database Error' }) :
                                resolve(res1)
                        }) :
                        reject({ error: er, errorMsg: 'Not exist' })
            })
        })
    }

    public deleteUser(id: string) {
        return new Promise((resolve, reject) => {
            this.user.deleteUser(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res)
            })
        })
    }


    public findUserById(id: string) {
        return new Promise((resolve, reject) => {
            this.user.findUserByIdWithProfile(id, (er, res: UserI) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'User not exist' })
            })
        })
    }

    public findUsersByPhone(params: PhoneI) {
        return new Promise((resolve, reject) => {
            this.user.findUserByPhone(params, (er, res: UserI) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res)
            })
        })

    }

    public getAll() {
        return new Promise((resolve, reject) => {
            this.user.findAll((er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res)
            })
        })
    }

    public changePassword(params: UserChangePasswordI, oldPassword: string) {

        return new Promise((resolve, reject) => {
            this.user.findUserById(params.id, (er1, user: UserI) => {
                if (er1)
                    reject({ error: er1, errorMsg: 'Database Error' })
                else if (!user)
                    reject({ error: "", errorMsg: 'User Not Exist' })
                else {
                    let hashPass = encription({ salt: user.salt, password: oldPassword })
                    if (hashPass === user.password) {
                        let salt = genRandomString({ stringLength: 15 })
                        let newHashPass = encription({ salt: salt, password: params.password })
                        params.password = newHashPass
                        params.salt = salt

                        this.user.updatePassword(params, (er, res) => {
                            er ?
                                reject({ error: er, errorMsg: 'Database Error' }) :
                                resolve(res)
                        })
                    }
                    else reject({ error: "", errorMsg: 'Your old password in wrong' })
                }
            })
        })

    }
}