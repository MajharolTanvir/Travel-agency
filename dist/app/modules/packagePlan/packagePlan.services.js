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
exports.PackagePlanServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const packagePlan_constant_1 = require("./packagePlan.constant");
const createPackage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.packagePlan.create({
        data,
        include: {
            guide: true,
            hotel: true,
            PackagePlaces: true,
            Reviews: true,
        },
    });
    return result;
});
const getAllPackage = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: packagePlan_constant_1.packageFilterAbleField.map(field => ({
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
    const result = yield prisma_1.prisma.packagePlan.findMany({
        where: whereCondition,
        skip,
        take: limit,
        include: {
            guide: true,
            hotel: true,
            PackagePlaces: true,
            Reviews: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.prisma.packagePlan.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSinglePackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.packagePlan.findFirst({
        where: {
            id,
        },
        include: {
            guide: true,
            hotel: true,
            PackagePlaces: true,
            Reviews: true,
        },
    });
    return result;
});
const updatePackage = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.packagePlan.update({
        where: {
            id,
        },
        data,
        include: {
            guide: true,
            hotel: true,
            PackagePlaces: true,
            Reviews: true,
        },
    });
    return result;
});
const deletePackage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.packagePlan.delete({
        where: {
            id,
        },
    });
    return result;
});
const createPackagePlaces = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.packagePlaces.createMany({
        data,
    });
    return result;
});
const updatePackagePlaces = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.packagePlaces.update({
        where: {
            id
        },
        data,
    });
    return result;
});
exports.PackagePlanServices = {
    createPackage,
    getAllPackage,
    getSinglePackage,
    updatePackage,
    deletePackage,
    createPackagePlaces,
    updatePackagePlaces
};
