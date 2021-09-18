"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineUsersAndJobs = void 0;
const _ = require("lodash");
const combineUsersAndJobs = (users, jobs) => {
    let jobAndUser = jobs.map((job) => {
        for (var i = 0; i < users.length; i++)
            if (users[i]['id'] === job.userId)
                return { user: users[i], ...job };
    });
    let jobsAndUsers = _.reject(jobAndUser, _.isNull);
    jobsAndUsers = _.reject(jobAndUser, _.isUndefined);
    return jobsAndUsers;
};
exports.combineUsersAndJobs = combineUsersAndJobs;
