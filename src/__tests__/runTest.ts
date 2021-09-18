import { TestApi } from "./renderingTestApis";
import * as path from "path";
import * as fs from "fs";
import "mocha";

const TestDataDirectoryPath = path.join(__dirname, "__test__Data__");
(async () => {
    fs.readdirSync(TestDataDirectoryPath)
        .filter((file) => {
            let temp = file.split('.')
            return (file.indexOf('.') !== 0) && (temp[temp.length - 1] === 'json')
        }).forEach((filename) => {
            return TestApi(require(path.join(TestDataDirectoryPath, filename)));
        });
})();
