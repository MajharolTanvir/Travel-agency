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
exports.PlacesServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const place_constant_1 = require("./place.constant");
const createPlace = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield prisma_1.prisma.place.create({
        data,
        include: {
            district: true,
        },
    });
    return place;
});
const getAllPlace = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: place_constant_1.placeSearchAbleField.map(field => ({
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
    const place = yield prisma_1.prisma.place.findMany({
        where: whereCondition,
        skip,
        take: limit,
        include: {
            district: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.prisma.place.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: place,
    };
});
const getSinglePlace = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield prisma_1.prisma.place.findFirst({
        where: {
            id,
        },
        include: {
            district: true,
        },
    });
    return place;
});
const updatePlace = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield prisma_1.prisma.place.update({
        where: {
            id,
        },
        include: {
            district: true,
        },
        data,
    });
    return place;
});
const deletePlace = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const place = yield prisma_1.prisma.place.delete({
        where: {
            id,
        },
    });
    return place;
});
exports.PlacesServices = {
    createPlace,
    getAllPlace,
    getSinglePlace,
    updatePlace,
    deletePlace,
};
