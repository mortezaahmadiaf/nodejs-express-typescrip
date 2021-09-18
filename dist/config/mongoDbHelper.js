"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const config_json_1 = require("./config.json");
class MongoHelper {
    constructor() {
    }
    static connect() {
        return new Promise((resolove, reject) => {
            if (this.client == null) {
                mongodb.MongoClient.connect(process.env.MONGODBCONNECTIONURL || config_json_1.mongo.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (error, client) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        this.client = client;
                        this.database = client.db(process.env.MONGODATABASENAME || config_json_1.mongo.database);
                        this.toDo = this.database.collection('toDo');
                        console.info('collections are ready');
                        resolove(this.database);
                    }
                });
            }
            else {
                resolove(this.database);
            }
        });
    }
    static disconnect() {
        this.client.close();
    }
}
exports.default = MongoHelper;
MongoHelper.client = null;
