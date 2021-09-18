import { ProfileModel } from './model';
import { ProfileI } from './schema';

export class ProfileManager {
	private profile: ProfileModel = new ProfileModel();


	public createProfile(params: ProfileI) {
		return new Promise((resolve, reject) => {
			this.profile.saveProfile(params, (er, res) => {
				er ? reject({ error: er, errormsg: 'Database Error' }) : resolve(res);
			});
		})

	}
	public updateProfile(params: ProfileI) {
		return new Promise((resolve, reject) => {
			this.profile.findProfileById(params.id, (er, res) => {
				er
					? reject({ error: er, errorMsg: 'Database Error' })
					: !res
						? reject({ error: er, errorMsg: 'Profole not exist' })
						: this.profile.updateProfile(params, (er1, res1) => {
							er1 ? reject({ error: er1, errorMsg: 'Database Error' }) : resolve(res1);
						});
			});
		})

	}
	public getProfileById(id: string) {
		return new Promise((resolve, reject) => {
			this.profile.findProfileById(id, (er, res) => {
				er ? reject({ error: er, errorMsg: 'Database Error' }) :
					!res ? reject({ error: "", errorMsg: 'Profole not exist' }) :
						resolve(res);
			});
		})

	}
	public delete(id: string) {
		return new Promise((resolve, reject) => {
			this.profile.delete(id, (er, res) => {
				er ?
					reject({ error: "", errorMsg: 'Database Error' }) :
					resolve(res)
			})
		})
	}

	public findAll() {
		return new Promise((resolve, reject) => {
			this.profile.findAll((er, res) => {
				er ?
					reject({ error: "", errorMsg: 'Database Error' }) :
					resolve(res)
			})
		})
	}
}
