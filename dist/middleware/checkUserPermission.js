"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJobsPermission = exports.checkJobCategoryPermission = exports.checkContactUsPermission = exports.checkVersionPermission = exports.checkUserManagementPermission = exports.checkRoleManagementPermission = exports.checkPermissionManagementPermission = void 0;
const getUserPermissions_1 = require("../script/getUserPermissions");
const sendMessages_1 = require("../script/sendMessages");
const checkPermissionManagementPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'permissionManagement' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkPermissionManagementPermission = checkPermissionManagementPermission;
const checkRoleManagementPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'roleManagement' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkRoleManagementPermission = checkRoleManagementPermission;
const checkUserManagementPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'userManagement' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkUserManagementPermission = checkUserManagementPermission;
const checkVersionPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'appVersion' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkVersionPermission = checkVersionPermission;
const checkContactUsPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'contactUs' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkContactUsPermission = checkContactUsPermission;
const checkJobCategoryPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'jobManagement' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkJobCategoryPermission = checkJobCategoryPermission;
const checkJobsPermission = (request, response, Next) => {
    getUserPermissions_1.getPermissions({ id: request['STUser'].id, permission: 'jobs' })
        .then(() => {
        Next();
    })
        .catch(() => {
        request['STUser'] = '';
        sendMessages_1.sendError({ response, status: 401, message: 'accessDenide' });
    });
};
exports.checkJobsPermission = checkJobsPermission;
