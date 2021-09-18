"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderingTestApis_1 = require("./renderingTestApis");
const path = require("path");
const fs = require("fs");
require("mocha");
const TestDataDirectoryPath = path.join(__dirname, "__test__Data__");
(async () => {
    fs.readdirSync(TestDataDirectoryPath)
        .filter((file) => {
        let temp = file.split('.');
        return (file.indexOf('.') !== 0) && (temp[temp.length - 1] === 'json');
    }).forEach((filename) => {
        return renderingTestApis_1.TestApi(require(path.join(TestDataDirectoryPath, filename)));
    });
})();
