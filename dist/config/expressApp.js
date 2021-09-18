"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const requestLogger_1 = require("../middleware/requestLogger");
const mongoDbHelper_1 = require("./mongoDbHelper");
const http_1 = require("http");
const socket_1 = require("./socket");
const dotenv = require("dotenv");
const script_1 = require("../script");
const test_1 = require("../routes/V1/test");
const profile_1 = require("../routes/V1/profile");
const todo_1 = require("../routes/V1/todo");
const user_1 = require("../routes/V1/user");
const uploadFile_1 = require("../routes/V1/uploadFile");
dotenv.config();
class App {
    constructor() {
        this.Port = parseInt(process.env.PORT) || 4000;
        this.app = express();
        this.middlewares();
        this.static();
        this.connectToMongo();
        this.Route();
        this.createHttpServer();
        this.createSocket();
    }
    static() {
        this.app.use(express.static("./files/file"));
        this.app.use(express.static("/file"));
    }
    middlewares() {
        this.app.set("view engine", ejs);
        this.app.use(cors());
        this.app.use((_, res, next) => {
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(requestLogger_1.logger);
    }
    Route() {
        this.app.use('/todo', todo_1.todo);
        this.app.use('/user', user_1.user);
        this.app.use('/profile', profile_1.profile);
        this.app.use('/file', uploadFile_1.uploadFile);
        this.app.use('/test', test_1.default);
        this.app.all('*', (request, response, next) => {
            script_1.sendError({ status: 404, response, message: 'Please check your URL' });
        });
    }
    async connectToMongo() {
        try {
            await mongoDbHelper_1.default.connect();
        }
        catch (error) {
            console.error("mongo", { error });
        }
    }
    createHttpServer() {
        this.httpServer = http_1.createServer(this.app);
    }
    createSocket() {
        this.socket = require("socket.io")(this.httpServer, { allowEIO3: true });
    }
    runServer() {
        let s = new socket_1.Socket(this.socket);
        this.httpServer.listen(this.Port, () => {
            console.info(`typeScript  server run on port : ${this.Port}`);
        });
    }
}
exports.default = new App();
