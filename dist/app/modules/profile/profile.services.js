"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const profile_constant_1 = require("./profile.constant");
const changeRole = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.user.update({
        where: {
            id,
        },
        data,
    });
});
const profileUpdate = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName } = userData, data = __rest(userData, ["firstName", "middleName", "lastName"]);
    let result = null;
    console.log(firstName, middleName, lastName);
    if (data) {
        result = yield prisma_1.prisma.profile.update({
            where: {
                userId: id,
            },
            data,
        });
    }
    result = yield prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
        },
    });
    return result;
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield prisma_1.prisma.user.findFirst({
        where: {
            id,
        },
        include: {
            Profile: true,
        },
    });
    return profile;
});
const getSingleProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield prisma_1.prisma.user.findFirst({
        where: {
            id,
        },
        include: {
            Profile: true,
        },
    });
    return profile;
});
const getAllProfile = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: profile_constant_1.userSearchAbleField.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const profile = yield prisma_1.prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        include: {
            Profile: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.prisma.user.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: profile,
    };
});
exports.ProfileService = {
    profileUpdate,
    getProfile,
    getSingleProfile,
    getAllProfile,
    changeRole,
};
