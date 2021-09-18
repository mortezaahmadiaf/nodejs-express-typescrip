"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportFunction = void 0;
const _1 = require("./");
const reportFunction = (jobsAndUsers, number) => {
    let list = [], payment = 0, date = _1.weekday(number);
    jobsAndUsers.map(async (item) => {
        if (item.endDate === date.date) {
            payment = payment + parseFloat(item.payment);
            list.push(item);
        }
    });
    return { payment, day: date.day, weekDay: date.weekDay };
};
exports.reportFunction = reportFunction;
