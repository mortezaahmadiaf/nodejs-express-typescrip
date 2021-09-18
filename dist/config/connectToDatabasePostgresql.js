"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databasConfig = require('./config.json');
const connectToDatabase = new sequelize_1.Sequelize(databasConfig.postgres);
exports.default = connectToDatabase;
