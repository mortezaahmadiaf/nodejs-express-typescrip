import { Profile, ProfileI } from './schema'
export class ProfileModel {
    private profile = Profile

    public async saveProfile(params: ProfileI, callback: any) {
        try {
            let result = await this.profile.create(params)
            callback(null, result)

        } catch (error) {
            callback(error, null)
        }
    }
    public async updateProfile(params: ProfileI, callback: any) {
        try {
            let result, pro = await this.profile.findOne({ where: { id: params.id } })
            result = await pro.update({ ...params })
            callback(null, result)

        } catch (error) {
            callback(error, null)
        }
    }
    public async findProfileById(id: string, callback: any) {
        try {
            let result = await this.profile.findOne({ where: { id } })
            callback(null, result)

        } catch (error) {
            callback(error, null)
        }
    }
    public async findProfileByUserId(userId: string, callback: any) {
        try {
            let result: ProfileI = await this.profile.findOne({ where: { userId } })
            callback(null, result)

        } catch (error) {
            callback(error, null)
        }
    }
    public async delete(id: string, callback: any) {
        try {
            let res = await this.profile.destroy({ where: { id } })
            callback(undefined, res)
        } catch (error) {
            callback(error)
        }
    }
    public async findAll(callback: any) {
        try {
            let res = await this.profile.findAll()
            callback(undefined, res)
        } catch (error) {
            callback(error)

        }

    }

}