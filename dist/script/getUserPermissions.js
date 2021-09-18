"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissions = void 0;
const schema_1 = require("../modules/adminanel_users/schema");
const schema_2 = require("../modules/roles/schema");
const schema_3 = require("../modules/permissoins/schema");
const getPermissions = ({ id = 0, permission }) => {
    return new Promise((resolve, reject) => {
        if (id !== 0) {
            schema_1.Adminpanel_user.findOne({ where: { id: id }, include: [{ model: schema_2.Roles }] })
                .then((user) => {
                if (user) {
                    const record = user.toJSON();
                    schema_3.Permissions.findAll({ where: { id: record.Role.permissions } })
                        .then((per) => {
                        if (per) {
                            let check = per.filter((item) => item.permission === permission);
                            if (check.length)
                                resolve({ result: true });
                            else
                                reject({ error: false });
                        }
                        else {
                            reject({ error: 'permissionNotExist' });
                        }
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
                else
                    reject({ error: 'notExist' });
            })
                .catch((error) => reject({ error }));
        }
        else
            reject({ error: 'id not valid' });
    });
};
exports.getPermissions = getPermissions;
