import mongo from "../../config/mongoDbHelper";
import { ObjectId } from "mongodb";
import {
  ToDoI, ToDoUpdateI
} from "./schema";
export class ToDoModel {



  public async save(info: ToDoI, callback: any) {
    try {
      let result = await mongo.toDo.insertOne(info);
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }
  public async update(info: ToDoUpdateI, callback: any) {
    let _id = new ObjectId(info._id);
    try {
      let result = await mongo.toDo.findOneAndUpdate(
        { _id },
        { $set: { toDo: info.toDo, done: info.done } }
      );
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }
  public async deleteById(_id: ObjectId, callback: any) {
    try {
      let result = await mongo.toDo.findOneAndDelete({ _id });
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }
  public async getById(_id: ObjectId, callback: any) {
    try {
      let result = await mongo.toDo.findOne({ _id });
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }

  public async getAll(callback: any) {
    try {
      let result = await mongo.toDo.find().toArray()
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }

}
