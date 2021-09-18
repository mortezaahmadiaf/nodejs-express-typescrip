import * as express from "express";
import * as cors from "cors";
import * as ejs from "ejs";
import * as bodyParser from "body-parser";
import { logger } from "../middleware/requestLogger";
import MongoHelper from "./mongoDbHelper";
import { createServer, Server } from "http";
import * as SocketIO from "socket.io";
import { Socket } from "./socket";
import * as dotenv from "dotenv";
import { sendError } from "../script";

// api class
import Test from '../routes/V1/test'
import { profile } from '../routes/V1/profile'
import { todo } from '../routes/V1/todo'
import { user } from '../routes/V1/user'
import { uploadFile } from '../routes/V1/uploadFile'



dotenv.config();
class App {
  public app: express.Application;
  private Port: number = parseInt(process.env.PORT) || 4000;
  private socket: SocketIO.Server;
  private httpServer: Server;
  constructor() {
    this.app = express();
    this.middlewares();
    this.static();
    this.connectToMongo();
    this.Route();
    this.createHttpServer();
    this.createSocket();
  }

  private static(): void {
    this.app.use(express.static("./files/file"));
    this.app.use(express.static("/file"));
  }

  private middlewares(): void {
    this.app.set("view engine", ejs);

    this.app.use(cors());
    this.app.use((_, res, next) => {
      // res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header('Access-Control-Allow-Credentials', "true")
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(logger);
  }
  private Route(): void {
    this.app.use('/todo', todo)
    this.app.use('/user', user)
    this.app.use('/profile', profile)
    this.app.use('/file', uploadFile)
    this.app.use('/test', Test)
    this.app.all('*',
      (request: express.Request, response: express.Response, next: express.NextFunction) => {
        sendError({ status: 404, response, message: 'Please check your URL' })
      })

  }

  private async connectToMongo(): Promise<void> {
    try {
      await MongoHelper.connect();
    } catch (error) {
      console.error("mongo", { error });
    }
  }

  private createHttpServer() {
    this.httpServer = createServer(this.app);
  }
  private createSocket() {
    this.socket = require("socket.io")(this.httpServer, { allowEIO3: true });
  }
  public runServer(): void {
    let s = new Socket(this.socket);

    this.httpServer.listen(this.Port, () => {
      console.info(`typeScript  server run on port : ${this.Port}`);
    });
  }
}

export default new App();
