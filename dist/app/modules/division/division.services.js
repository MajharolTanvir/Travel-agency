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
exports.DivisionsServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const division_constant_1 = require("./division.constant");
const createDivision = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield prisma_1.prisma.division.create({
        data,
    });
    return division;
});
const getAllDivision = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: division_constant_1.divisionSearchAbleField.map(field => ({
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
    const division = yield prisma_1.prisma.division.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.prisma.division.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: division,
    };
});
const getSingleDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield prisma_1.prisma.division.findFirst({
        where: {
            id,
        },
    });
    return division;
});
const updateDivision = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield prisma_1.prisma.division.update({
        where: {
            id,
        },
        data,
    });
    return division;
});
const deleteDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const division = yield prisma_1.prisma.division.delete({
        where: {
            id,
        },
    });
    return division;
});
exports.DivisionsServices = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
