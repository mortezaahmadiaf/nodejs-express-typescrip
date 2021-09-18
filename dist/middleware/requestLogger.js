"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk = require("chalk");
const logger = (request, response, next) => {
    console.info(`\n Method: ${request.method} ___ Route: ${request.originalUrl} \n `);
    const start = new Date().getTime();
    response.on('finish', () => {
        const elepsTime = new Date().getTime() - start;
        console.info(`\n Method: ${request.method} ___ Route: ${request.originalUrl} ___ Status Code: ${response.statusCode === 200 ? chalk.green(response.statusCode) : chalk.red(response.statusCode)} ___ Request Time: ${elepsTime}ms \n`);
    });
    next();
};
exports.logger = logger;
