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
exports.TransportsServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const transport_constant_1 = require("./transport.constant");
const createTransport = (transportData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.transport.create({
        data: transportData,
        include: {
            district: true,
            Reviews: true,
        },
    });
    return result;
});
const getAllTransport = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: transport_constant_1.transportSearchAbleField.map(field => ({
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
    const result = yield prisma_1.prisma.transport.findMany({
        where: whereCondition,
        skip,
        take: limit,
        include: {
            district: true,
            Reviews: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.prisma.transport.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleTransport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.transport.findFirst({
        where: {
            id,
        },
        include: {
            district: true,
        },
    });
    return result;
});
const updateTransport = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.transport.update({
        where: {
            id,
        },
        data,
        include: {
            district: true,
        },
    });
    return result;
});
const deleteTransport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.transport.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.TransportsServices = {
    createTransport,
    getAllTransport,
    getSingleTransport,
    updateTransport,
    deleteTransport,
};
