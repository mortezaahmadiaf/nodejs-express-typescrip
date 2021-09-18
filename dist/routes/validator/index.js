"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userId = exports.userPermission = exports.updatePermission = exports.updateRole = exports.userJob = exports.userDevicetoken = exports.userLocation = exports.rating = exports.passwordCode = exports.phoneCountryCode = exports.profileUpdate = exports.profile = exports.pagination = exports.profileImage = exports.jobId = exports.locationId = exports.loginValidation = exports.id = exports.insertUserValidation = exports.insertJob = exports.insertRole = exports.idCheck = exports.newPermission = exports.files = exports.file = exports.endJob = exports.donePayment = exports.changePassword = exports.customReport = exports.code = exports.categoryUpdate = exports.category = exports.applyJob = exports.adminpanelChangePassword = exports.adminpanelUserUpdate = exports.adminpanelLogin = exports.accept = exports.answerContactUs = exports.AddContactUs = void 0;
const express_validator_1 = require("express-validator");
exports.AddContactUs = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        isUUID: {
            errorMessage: 'userId type error'
        },
        exists: {
            errorMessage: 'userId is require',
            options: { checkNull: true }
        },
        notEmpty: { errorMessage: 'userId can`t be null' }
    },
    message: {
        in: 'body',
        isString: { errorMessage: 'message type error' },
        isLength: { errorMessage: 'messeage must more then 10 character', options: { min: 10 } },
        notEmpty: { errorMessage: 'messeage can`t be null' },
        exists: { errorMessage: 'message is require', options: { checkNull: true } }
    },
    subject: {
        in: 'body',
        isString: { errorMessage: 'subject type error' },
        isLength: { errorMessage: 'subject must more then 5 character', options: { min: 5 } },
        notEmpty: { errorMessage: 'subject can`t be null' },
        exists: { errorMessage: 'subject is require', options: { checkNull: true } }
    },
    email: {
        in: 'body',
        isEmail: { errorMessage: 'Email type error' },
        isLength: { errorMessage: 'Email must more then 10 character', options: { min: 10 } },
        notEmpty: { errorMessage: 'Email can`t be null' },
        exists: { errorMessage: 'Email is require', options: { checkNull: true } }
    },
    name: {
        in: 'body',
        isString: { errorMessage: 'Name type error' },
        isLength: { errorMessage: 'Name must more then 3 character', options: { min: 3 } },
        notEmpty: { errorMessage: 'Name can`t be null' },
        exists: { errorMessage: 'Name is require', options: { checkNull: true } }
    }
});
exports.answerContactUs = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        isUUID: {
            errorMessage: 'userId type error'
        },
        exists: {
            errorMessage: 'userId is require',
            options: { checkNull: true }
        },
        notEmpty: { errorMessage: 'userId can`t be null' }
    },
    message: {
        in: 'body',
        isString: { errorMessage: 'message type error' },
        isLength: { errorMessage: 'messeage must more then 10 character', options: { min: 10 } },
        notEmpty: { errorMessage: 'messeage can`t be null' },
        exists: { errorMessage: 'message is require', options: { checkNull: true } }
    },
    _id: {
        in: 'body',
        isMongoId: {
            errorMessage: 'ticket id type error'
        },
        notEmpty: { errorMessage: 'ticket id  can`t be null' },
        exists: { errorMessage: 'ticket id  is require', options: { checkNull: true } }
    }
});
exports.accept = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        isUUID: {
            errorMessage: 'userId type error'
        },
        exists: {
            errorMessage: 'userId'
        }
    },
    jobId: {
        in: 'body',
        exists: {
            errorMessage: 'jobId require'
        },
        isMongoId: {
            errorMessage: 'jobId type error'
        }
    }
});
exports.adminpanelLogin = express_validator_1.checkSchema({
    email: {
        in: 'body',
        isEmail: { errorMessage: 'type error' },
        exists: { errorMessage: 'email is require' },
        notEmpty: { errorMessage: 'email can`t be null' },
        isLength: { errorMessage: 'email length must be more then 12-50', options: { min: 12, max: 50 } }
    },
    password: {
        in: 'body',
        isString: { errorMessage: 'password type error' },
        exists: { errorMessage: 'password is require' },
        notEmpty: { errorMessage: 'password can`t be null' }
    }
});
exports.adminpanelUserUpdate = express_validator_1.checkSchema({
    firstName: {
        in: 'body',
        isString: { errorMessage: 'first Name Must Be An String' },
        exists: { errorMessage: 'firstName Is Require' },
        notEmpty: { errorMessage: 'First name must have value' },
        isLength: { errorMessage: 'first name length must be 6-50', options: { min: 3, max: 50 } }
    },
    lastName: {
        in: 'body',
        isString: { errorMessage: 'last name must be an string' },
        exists: { errorMessage: 'last name is require' },
        notEmpty: { errorMessage: 'password must have value' },
        isLength: { errorMessage: 'last name length must be 6-50', options: { min: 3, max: 50 } }
    },
    email: {
        in: 'body',
        isEmail: { errorMessage: 'error In Email Type' },
        exists: { errorMessage: 'email Require' },
        notEmpty: { errorMessage: 'email must have value' },
        isLength: { errorMessage: 'email length must be 12-50', options: { min: 12, max: 50 } }
    },
    phone: {
        in: 'body',
        isMobilePhone: { errorMessage: 'phone must be mobile' },
        exists: { errorMessage: 'Phone is Require' },
        isLength: { errorMessage: 'Phone length must be 6-15', options: { min: 6, max: 15 } },
        notEmpty: { errorMessage: 'phone can`t be null' }
    },
    role: {
        in: 'body',
        isUUID: { errorMessage: 'invalid role type' },
        notEmpty: { errorMessage: 'role cannot be null' },
        exists: { errorMessage: 'role is require' }
    },
    id: {
        in: 'body',
        isUUID: { errorMessage: 'id type error' },
        notEmpty: { errorMessage: 'id can`t be null' },
        exists: { errorMessage: 'id is require' }
    }
});
exports.adminpanelChangePassword = express_validator_1.checkSchema({
    password: {
        in: 'body',
        isString: { errorMessage: 'last Name Must Be An String' },
        exists: { errorMessage: 'last name Is Require' },
        notEmpty: { errorMessage: 'password must have value' },
        isLength: { errorMessage: 'password length must be 6-15', options: { min: 6, max: 15 } }
    },
    id: {
        in: 'body',
        isUUID: { errorMessage: 'id type error' },
        notEmpty: { errorMessage: 'id can`t be null' },
        exists: { errorMessage: 'id is require' }
    }
});
exports.applyJob = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        exists: { errorMessage: 'userId in require' },
        isUUID: { errorMessage: 'user id type wrong' }
    },
    jobId: {
        in: 'body',
        isMongoId: { errorMessage: 'job id type wrong' },
        exists: { errorMessage: 'jobId in require' }
    },
    deviceToken: {
        in: 'body',
        optional: true
    },
    jobDeviceToken: {
        in: 'body',
        optional: true
    }
});
exports.category = express_validator_1.checkSchema({
    name: { in: 'body', exists: { errorMessage: 'name is require' }, isString: { errorMessage: 'name type is wrong' } }
});
exports.categoryUpdate = express_validator_1.checkSchema({
    id: { in: 'body', exists: { errorMessage: 'id is require' }, isUUID: { errorMessage: 'id type is wrong' } },
    name: { in: 'body', exists: { errorMessage: 'name is require' }, isString: { errorMessage: 'name type is wrong' } }
});
exports.code = express_validator_1.checkSchema({
    code: { in: 'body', isLength: { errorMessage: 'CodeMustIm6Charecter', options: { max: 4, min: 4 } } }
});
exports.customReport = express_validator_1.checkSchema({
    userId: {
        in: 'params',
        notEmpty: { errorMessage: 'userId require' },
        isUUID: { errorMessage: 'userId type error' }
    },
    from: {
        in: 'params',
        isDate: { errorMessage: 'from type error' },
        exists: { errorMessage: 'from is require' },
        notEmpty: { errorMessage: 'from must have value' }
    },
    to: {
        in: 'params',
        isDate: { errorMessage: 'to type error' },
        exists: { errorMessage: 'to is require' },
        notEmpty: { errorMessage: 'to must have value' }
    }
});
exports.changePassword = express_validator_1.checkSchema({
    password: {
        in: 'body',
        isString: { errorMessage: 'old password type error' },
        isLength: { errorMessage: 'old password mus more then 6 charecter', options: { min: 6 } },
        exists: { errorMessage: 'old password is require' },
        notEmpty: { errorMessage: 'old password cannot be null' }
    }, newPassword: {
        in: 'body',
        isString: { errorMessage: 'new password type error' },
        isLength: { errorMessage: 'new password mus more then 6 charecter', options: { min: 6 } },
        exists: { errorMessage: 'new password is require' },
        notEmpty: { errorMessage: 'new password cannot be null' }
    }, id: {
        in: 'body',
        isUUID: { errorMessage: 'id type error' },
        exists: { errorMessage: "id is require" }
    }
});
exports.donePayment = express_validator_1.checkSchema({
    jobId: {
        in: 'body',
        notEmpty: { errorMessage: 'Job id cannot be null' },
        exists: { errorMessage: 'Job id is require' }, isMongoId: { errorMessage: 'Job id type error' }
    },
    paymentType: {
        notEmpty: { errorMessage: 'Payment type cannot be null' },
        in: "body", exists: { errorMessage: 'Payment type require' },
        isBoolean: { errorMessage: 'Payment type error' }
    },
    payId: { in: 'body', notEmpty: { errorMessage: 'payment id cannot be null' }, exists: { errorMessage: 'Payment id is require' }, isString: { errorMessage: 'Payment id is require' } }
});
exports.endJob = express_validator_1.checkSchema({
    jobId: {
        in: 'body',
        exists: { errorMessage: 'jobId is require' },
        isMongoId: { errorMessage: 'jobId type is wrong' }
    }
});
exports.file = express_validator_1.checkSchema({ file: { in: 'body' } });
exports.files = express_validator_1.checkSchema({ files: { in: 'body' } });
exports.newPermission = express_validator_1.checkSchema({
    permission: {
        in: ['body'],
        exists: { errorMessage: ' requierd' },
        isString: { errorMessage: ' must be String' },
        notEmpty: { errorMessage: ' must have value' }
    },
    permissionName: {
        in: ['body'],
        exists: { errorMessage: ' in requierd' },
        isString: { errorMessage: ' must be String' },
        notEmpty: { errorMessage: ' must have value' }
    }
});
exports.idCheck = express_validator_1.checkSchema({
    id: {
        in: 'body',
        notEmpty: { errorMessage: 'id can`t be null' },
        isMongoId: { errorMessage: 'id type error' },
        exists: { errorMessage: 'id is require' }
    }
});
exports.insertRole = express_validator_1.checkSchema({
    roleName: {
        in: 'body',
        isString: { errorMessage: 'role name type error' },
        exists: { errorMessage: 'role name is require' },
        notEmpty: { errorMessage: 'role name can`t be null' }
    },
    role: {
        in: 'body',
        isString: { errorMessage: 'role type error' },
        exists: { errorMessage: 'role is require' },
        notEmpty: { errorMessage: 'role can`t be null' }
    }
});
exports.insertJob = express_validator_1.checkSchema({
    location: {
        in: 'body',
        notEmpty: { errorMessage: 'loation is require', negated: true },
        custom: {
            errorMessage: ' lat and lng must be in location',
            options: (value) => {
                return value.lat &&
                    typeof value.lat === 'number' &&
                    value.lng &&
                    typeof value.lng === 'number' &&
                    Object.keys(value).length === 2
                    ? true
                    : false;
            }
        }
    },
    cityName: {
        in: 'body',
        isString: { errorMessage: 'City name type error' },
        notEmpty: { errorMessage: 'city name canot be null', },
        exists: { errorMessage: 'city name is require' }
    },
    description: {
        in: 'body',
        isString: { errorMessage: 'discriptionMustBeString' },
        isLength: { errorMessage: 'discriptionMinValue10MaxValue200' },
        notEmpty: { errorMessage: 'discriptionIsRequire', negated: true }
    },
    title: {
        in: 'body',
        isString: { errorMessage: 'titleMustBeString' },
        isLength: { errorMessage: 'titleMinValue5MaxValue4', options: { min: 4 } },
        notEmpty: { errorMessage: 'titleIsRequire', negated: true }
    },
    skills: {
        in: 'body',
        isArray: { errorMessage: 'skillsnMustBeString' },
        optional: true
    },
    payment: {
        in: 'body',
        isNumeric: { errorMessage: 'paymentInNumber' },
        notEmpty: { errorMessage: 'paymentIsRequire' },
        custom: { errorMessage: 'paymentMustBeBigerThen1', options: (value) => (value > 1 ? true : false) }
    },
    images: {
        in: 'body',
        isArray: { errorMessage: 'imagesMustBeStringArray', options: { min: 0, max: 4 } },
        optional: true,
        custom: {
            errorMessage: 'imagesItemMustBeString',
            options: (value) => {
                let counter = 0;
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] === 'string' && value[i].length > 4)
                        counter++;
                }
                return counter === value.length || value.length === 0 ? true : false;
            }
        }
    },
    userId: {
        in: 'body',
        isUUID: { errorMessage: 'userIdMustBeUUID' },
        notEmpty: { errorMessage: 'userIdRequire' }
    },
    deviceToken: {
        in: 'body',
        optional: true
    },
    startDate: {
        in: 'body',
        isDate: { errorMessage: 'dateType' },
        notEmpty: { errorMessage: 'startDateIsRequire' }
    },
    startTime: {
        in: 'body',
        isString: { errorMessage: 'startTimeIsString' },
        notEmpty: { errorMessage: 'startTimeFildIsRequire' }
    }
});
exports.insertUserValidation = express_validator_1.checkSchema({
    firstName: {
        in: 'body',
        isString: { errorMessage: 'first Name Must Be An String' },
        exists: { errorMessage: 'firstName Is Require' },
        notEmpty: { errorMessage: 'First name must have value' },
        isLength: { errorMessage: 'first name length must be 6-50', options: { min: 3, max: 50 } }
    },
    lastName: {
        in: 'body',
        isString: { errorMessage: 'last name must be an string' },
        exists: { errorMessage: 'last name is require' },
        notEmpty: { errorMessage: 'password must have value' },
        isLength: { errorMessage: 'last name length must be 6-50', options: { min: 3, max: 50 } }
    },
    email: {
        in: 'body',
        isEmail: { errorMessage: 'error In Email Type' },
        exists: { errorMessage: 'email Require' },
        notEmpty: { errorMessage: 'email must have value' },
        isLength: { errorMessage: 'email length must be 12-50', options: { min: 12, max: 50 } }
    },
    phone: {
        in: 'body',
        isMobilePhone: { errorMessage: 'phone must be mobile' },
        exists: { errorMessage: 'Phone is Require' },
        isLength: { errorMessage: 'Phone length must be 6-15', options: { min: 6, max: 15 } },
        notEmpty: { errorMessage: 'phone can`t be null' }
    },
    role: {
        in: 'body',
        isUUID: { errorMessage: 'invalid role type' },
        notEmpty: { errorMessage: 'role cannot be null' },
        exists: { errorMessage: 'role is require' }
    },
    password: {
        in: 'body',
        isString: { errorMessage: 'last Name Must Be An String' },
        exists: { errorMessage: 'last name Is Require' },
        notEmpty: { errorMessage: 'password must have value' },
        isLength: { errorMessage: 'password length must be 6-15', options: { min: 6, max: 15 } }
    }
});
exports.id = express_validator_1.checkSchema({
    id: {
        in: 'params',
        isUUID: { errorMessage: 'id type error' },
        notEmpty: { errorMessage: 'id can`t bet null' },
        exists: { errorMessage: 'id is require' }
    }
});
exports.loginValidation = express_validator_1.checkSchema({
    phone: {
        in: 'body',
        exists: { errorMessage: 'phone Number Is Requierd' },
        isMobilePhone: { errorMessage: 'phone Number Must Be Number' },
        notEmpty: { errorMessage: 'Phone Number Can Not Be Null' },
        isLength: {
            options: { min: 6, max: 15 },
            errorMessage: 'minimumLengthOfPhoneMustBe8'
        }
    },
    countryCode: {
        in: 'body',
        isString: { errorMessage: 'country code type error' },
        exists: { errorMessage: 'country code in require' },
        notEmpty: { errorMessage: 'country code can`t be null' }
    },
    password: {
        in: 'body',
        exists: { errorMessage: 'passwordIsRequierd' },
        isString: { errorMessage: 'passwordMustBeString' },
        notEmpty: { errorMessage: 'passwordCanNotBeNull' },
        isLength: {
            errorMessage: 'minimumLengthOfPhoneMustBe6',
            options: { min: 6 }
        }
    }
});
exports.locationId = express_validator_1.checkSchema({
    locationId: {
        in: 'params',
        isNumeric: { errorMessage: 'location id type error' },
        notEmpty: { errorMessage: 'location id is require' }
    }
});
exports.jobId = express_validator_1.checkSchema({
    jobId: {
        in: 'params',
        notEmpty: { errorMessage: 'jobId require' },
        isMongoId: { errorMessage: 'jobId type error' }
    }
});
exports.profileImage = express_validator_1.checkSchema({ profile: { in: 'body' } });
exports.pagination = express_validator_1.checkSchema({
    page: {
        in: 'params',
        exists: { errorMessage: 'page number require' },
        isInt: { errorMessage: 'page number type error' }
    },
    countPerPage: {
        in: 'params',
        exists: { errorMessage: 'count per page is require' },
        isInt: { errorMessage: 'count per page type error' }
    }
});
exports.profile = express_validator_1.checkSchema({
    firstName: {
        in: 'body',
        isString: {
            errorMessage: 'firstNameMustBeAnString'
        },
        exists: {
            errorMessage: 'firstNameIsRequire'
        },
        notEmpty: {
            errorMessage: 'firstName can`t be null'
        }
    },
    lastName: {
        in: 'body',
        isString: {
            errorMessage: 'lastNameMustBeAnString'
        },
        exists: {
            errorMessage: 'lastNameIsRequire'
        },
        notEmpty: {
            errorMessage: 'lastName can`t be null'
        }
    },
    image: {
        in: 'body',
        isString: {
            errorMessage: 'imageMustBeAnString'
        }
    },
    userId: {
        in: 'body',
        isUUID: {
            errorMessage: 'userIdMustBeisUUID'
        },
        exists: {
            errorMessage: 'userIdIsRequire'
        },
        notEmpty: {
            errorMessage: 'user id can`t be null'
        }
    },
    type: {
        in: 'body',
        isBoolean: {
            errorMessage: 'typeMustBeBoolean'
        },
        exists: {
            errorMessage: 'typeIsRequire'
        }
    },
    address: {
        in: 'body',
        isString: {
            errorMessage: 'addressMustBeString'
        },
        exists: {
            errorMessage: 'addressIsRequire'
        },
        optional: true
    },
    skills: {
        in: 'body',
        isArray: {
            errorMessage: 'skillsnMustBeString'
        },
        optional: true
    }
});
exports.profileUpdate = express_validator_1.checkSchema({
    id: {
        in: 'body',
        isUUID: {
            errorMessage: 'idMustBeUUID'
        },
        optional: true,
        notEmpty: { errorMessage: 'id can`t be null' }
    },
    firstName: {
        in: 'body',
        isString: {
            errorMessage: 'firstNameMustBeAnString'
        },
        optional: true,
        notEmpty: {
            errorMessage: 'firstName can`t be null'
        }
    },
    lastName: {
        in: 'body',
        isString: {
            errorMessage: 'lastNameMustBeAnString'
        },
        optional: true,
        notEmpty: {
            errorMessage: 'lastName can`t be null'
        }
    },
    image: {
        in: 'body',
        isString: {
            errorMessage: 'imageMustBeAnString'
        },
        optional: true
    },
    userId: {
        in: 'body',
        notEmpty: {
            errorMessage: 'userId can`t be null'
        },
        isUUID: {
            errorMessage: 'userIdMustBeisUUID'
        },
        exists: {
            errorMessage: 'userIdIsRequire'
        }
    },
    type: {
        in: 'body',
        isBoolean: {
            errorMessage: 'typeMustBeBoolean'
        },
        optional: true,
        notEmpty: {
            errorMessage: 'type can`t be expty'
        }
    },
    address: {
        in: 'body',
        isString: {
            errorMessage: 'addressMustBeString'
        },
        optional: true,
        notEmpty: {
            errorMessage: 'address can`t be null'
        }
    },
    skills: {
        in: 'body',
        isArray: {
            errorMessage: 'skillsnMustBeString'
        },
        optional: true
    }
});
exports.phoneCountryCode = express_validator_1.checkSchema({
    phone: {
        in: 'body',
        isLength: { errorMessage: 'phoneNumberMinLengthIs8', options: { min: 6, max: 15 } },
        exists: { errorMessage: 'PhoneNumberIsRequier' },
        notEmpty: { errorMessage: 'PhoneNumberIsRequier' }
    },
    countryCode: {
        in: 'body',
        isLength: { errorMessage: 'countryCodeMustIm1or', options: { min: 1, max: 4 } },
        exists: { errorMessage: 'countryCodeIsRequire' }
    }
});
exports.passwordCode = express_validator_1.checkSchema({
    password: {
        in: 'body',
        isLength: { errorMessage: 'passwordNumberMinLengthIs6', options: { min: 6 } },
        exists: { errorMessage: 'passwordIsRequier' },
        notEmpty: { errorMessage: 'passwordIsRequier' }
    },
    code: { in: 'body', isLength: { errorMessage: 'CodeMustIm6Charecter', options: { max: 4, min: 4 } } }
});
exports.rating = express_validator_1.checkSchema({
    workerId: {
        in: 'body',
        exists: { errorMessage: 'workerId is require' },
        isUUID: { errorMessage: 'workerId type is wrong' }
    },
    posterId: {
        in: 'body',
        exists: { errorMessage: 'posterId is require' },
        isUUID: { errorMessage: 'posterId type is wrong' }
    },
    jobId: {
        in: 'body',
        exists: { errorMessage: 'jobId is require' },
        isMongoId: { errorMessage: 'jobId type is wrong' }
    },
    message: { in: 'body', optional: true, isString: { errorMessage: 'message type is wrong' } },
    rate: { in: 'body', isInt: { errorMessage: 'rate type is wrong' }, exists: { errorMessage: 'rate is require' } }
});
exports.userLocation = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        isUUID: { errorMessage: 'user id type error' },
        exists: { errorMessage: 'user id is require' },
        notEmpty: { errorMessage: 'user id can`t be null' }
    },
    locationId: {
        in: 'body',
        isNumeric: { errorMessage: 'location type error' },
        exists: { errorMessage: 'location id is require' },
        notEmpty: { errorMessage: 'location id can`t be null' }
    }
});
exports.userDevicetoken = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        isUUID: { errorMessage: 'user id type error' },
        exists: { errorMessage: 'user id is require' },
        notEmpty: { errorMessage: 'user id can`t be null' }
    },
    deviceToken: {
        in: 'body',
        isJWT: { errorMessage: 'devicetoken type error' },
        exists: { errorMessage: 'device token is require' },
        notEmpty: { errorMessage: 'device token can`t be null' }
    }
});
exports.userJob = express_validator_1.checkSchema({
    userId: {
        in: 'body',
        isUUID: { errorMessage: 'user id type error' },
        exists: { errorMessage: 'user id is require' },
        notEmpty: { errorMessage: 'user id can`t be null' }
    },
    categoryId: {
        in: 'body',
        isUUID: { errorMessage: 'user id type error' },
        exists: { errorMessage: 'user id is require' },
        notEmpty: { errorMessage: 'user id can`t be null' }
    }
});
exports.updateRole = express_validator_1.checkSchema({
    id: {
        in: 'body',
        exists: { errorMessage: 'id is require' },
        notEmpty: { errorMessage: 'id can`t be null' },
        isUUID: { errorMessage: 'id type error' }
    },
    roleName: {
        in: 'body',
        isString: { errorMessage: 'role name type error' },
        exists: { errorMessage: 'role name is require' },
        notEmpty: { errorMessage: 'role name can`t be null' }
    },
    role: {
        in: 'body',
        isString: { errorMessage: 'role type error' },
        exists: { errorMessage: 'role is require' },
        notEmpty: { errorMessage: 'role can`t be null' }
    }
});
exports.updatePermission = express_validator_1.checkSchema({
    id: {
        in: ['body'],
        exists: { errorMessage: 'is requierd' },
        isUUID: { errorMessage: ' type wrong' }
    },
    permission: {
        in: ['body'],
        exists: { errorMessage: ' requierd' },
        isString: { errorMessage: ' must be String' },
        notEmpty: { errorMessage: ' must have value' }
    },
    permissionName: {
        in: ['body'],
        exists: { errorMessage: ' in requierd' },
        isString: { errorMessage: ' must be String' },
        notEmpty: { errorMessage: ' must have value' }
    }
});
exports.userPermission = express_validator_1.checkSchema({
    permissions: {
        in: ['body'],
        exists: { errorMessage: 'is required' },
        isArray: { errorMessage: 'must be integer array' },
        notEmpty: { errorMessage: 'permission can`t be null' },
        custom: {
            options: (value) => {
                let check = [];
                value.map((item) => {
                    if (typeof item === 'string' && item.split('-').length === 5) {
                        check.push(item);
                    }
                });
                return value.length === check.length ? true : false;
            }
        }
    }
});
exports.userId = express_validator_1.checkSchema({
    userId: {
        in: 'params',
        notEmpty: { errorMessage: 'userId require' },
        isUUID: { errorMessage: 'userId type error' }
    }
});
