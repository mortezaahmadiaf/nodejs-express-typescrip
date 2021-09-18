import * as mongodb from 'mongodb'
import { Collection, Db, MongoClient } from 'mongodb'
import { mongo } from './config.json'
export default class MongoHelper {
    public static client: MongoClient = null;
    public static database: Db;
    public static toDo: Collection;


    constructor() {
    }
    public static connect() {

        return new Promise((resolove, reject) => {
            if (this.client == null) {
                mongodb.MongoClient.connect(process.env.MONGODBCONNECTIONURL || mongo.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (error, client: mongodb.MongoClient) => {
                    if (error) {
                        reject(error)
                    } else {
                        this.client = client
                        this.database = client.db(process.env.MONGODATABASENAME || mongo.database)
                        this.toDo = this.database.collection('toDo')

                        console.info('Connect to mongoDb and collection is ready')
                        resolove(this.database)
                    }
                })
            }
            else {

                resolove(this.database)
            }
        })
    }




    public static disconnect() {
        this.client.close()
    }


}
