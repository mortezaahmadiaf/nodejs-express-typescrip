"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekday = exports.today = exports.reportStartTime = exports.weekdays = exports.todayDateString = void 0;
const todayDateString = () => {
    return new Date().toISOString().split('T')[0];
};
exports.todayDateString = todayDateString;
const weekdays = () => {
    let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays;
};
exports.weekdays = weekdays;
const reportStartTime = (daysAgo) => {
    let today = new Date();
    today.setDate(today.getDate() - daysAgo);
    return today.toISOString().split('T')[0];
};
exports.reportStartTime = reportStartTime;
const today = () => {
    let today = new Date();
    return today.toISOString().split('T')[0];
};
exports.today = today;
const weekday = (daysAgo) => {
    let today = new Date();
    today.setDate(today.getDate() - daysAgo);
    let day = today.getDay();
    return { date: today.toISOString().split('T')[0], day, weekDay: exports.weekdays()[day] };
};
exports.weekday = weekday;
