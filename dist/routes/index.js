"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgetPassword_1 = require("./V1/forgetPassword");
const countriesAndCities_1 = require("./V1/countriesAndCities");
const permission_1 = require("./V1/permission");
const role_1 = require("./V1/role");
const adminPanelUser_1 = require("./V1/adminPanelUser");
const user_1 = require("./V1/user");
const profile_1 = require("./V1/profile");
const uploadFile_1 = require("./V1/uploadFile");
const jobs_1 = require("./V1/jobs");
const notifications_1 = require("./V1/notifications");
const appVersion_1 = require("./V1/appVersion");
const report_1 = require("./V1/report");
const contactUs_1 = require("./V1/contactUs");
const payment_1 = require("./V1/payment");
const stripeAccount_1 = require("./V1/stripeAccount");
const apiRoutes = [
    {
        class: forgetPassword_1.default,
        route: '/forgot-password'
    },
    {
        class: contactUs_1.default,
        route: '/contact'
    },
    {
        class: countriesAndCities_1.default,
        route: '/world'
    },
    {
        class: permission_1.default,
        route: '/permission'
    }, {
        class: role_1.default,
        route: '/role'
    }, {
        class: adminPanelUser_1.default,
        route: '/adminpanel'
    },
    {
        class: user_1.default,
        route: '/user'
    }, {
        class: profile_1.default,
        route: '/profile'
    }, {
        class: uploadFile_1.default,
        route: '/file-upload'
    }, {
        class: jobs_1.default,
        route: '/jobs'
    }, {
        class: notifications_1.default,
        route: '/notifications'
    }, {
        class: appVersion_1.default,
        route: '/version'
    },
    {
        class: report_1.default,
        route: '/report'
    },
    {
        class: payment_1.default,
        route: '/payment'
    },
    {
        class: stripeAccount_1.default,
        route: '/stripe'
    },
];
exports.default = apiRoutes;
