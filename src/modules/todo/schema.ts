

export class ToDo {
	private _id: string;
	private userId: string;
	private toDo: string;
	private done: boolean
	constructor(info: ToDoI) {
		this.userId = info.userId;
		this._id = info._id;
		this.done = false;
		this.toDo = info.toDo

	}
	public getJson(): ToDoI {
		return {
			_id: this._id,
			userId: this.userId,
			done: this.done,
			toDo: this.toDo

		};
	}
}
export class ToDoUpdate {
	private _id: string;
	private toDo: string;
	private done: boolean
	constructor(info: ToDoUpdateI) {
		this._id = info._id;
		this.done = info.done;
		this.toDo = info.toDo

	}
	public getJson(): ToDoUpdateI {
		return {
			_id: this._id,
			done: this.done,
			toDo: this.toDo

		};
	}
}



export interface ToDoI {
	_id?: string;
	userId: string;
	toDo: string;
	done: boolean

}
export interface ToDoUpdateI {
	_id: string;
	done?: boolean
	toDo?: string

}

