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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const randomstring_1 = __importDefault(require("randomstring"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = require("../../../shared/prisma");
const sendResetPasswordWithMail = (name, email, token) => {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.emailHost,
        port: 25,
        secure: false,
        requireTLS: true,
        auth: {
            user: config_1.default.emailUser,
            pass: config_1.default.emailPassword,
        },
    });
    const mailOptions = {
        from: config_1.default.emailUser,
        to: email,
        subject: 'Reset your Quick tour plan website password here!',
        html: '<div><h3 h3 > Dear honorable user ' +
            name +
            ',</h3><p>Are you want to change your website password link? Please click on the following link to <a style="color: blue, font-weight: bold" href = "http://localhost:3000/auth/reset-password/?token=' +
            token +
            '"> Reset your password </a> on Quick Tour Plan.</p></div>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
        }
        else {
            console.info('Email sent:', info.response);
        }
    });
};
const signup = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.password = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    const user = yield prisma_1.prisma.user.create({
        data: userData,
    });
    yield prisma_1.prisma.profile.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    const { id: userId, email: userEmail, role } = user;
    const accessToken = jwtHelpers_1.JwtHelpers.createToken({ userId, userEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.JwtHelpers.createToken({ userId, userEmail, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const signin = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password does not match');
    }
    const { id: userId, email: userEmail, role } = isUserExist;
    const accessToken = jwtHelpers_1.JwtHelpers.createToken({ userId, userEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.JwtHelpers.createToken({ userId, userEmail, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.findUnique({ where: { email: email } });
    if (user) {
        const resetToken = randomstring_1.default.generate();
        yield prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { token: resetToken },
        });
        const middleName = (user === null || user === void 0 ? void 0 : user.middleName) !== null ? user === null || user === void 0 ? void 0 : user.middleName : '';
        const name = (user === null || user === void 0 ? void 0 : user.firstName) + ' ' + middleName + ' ' + (user === null || user === void 0 ? void 0 : user.lastName);
        sendResetPasswordWithMail(name, user.email, resetToken);
    }
    else {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "The user doesn't exist");
    }
});
const resetPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.prisma.user.findFirst({ where: { token: token } });
    password = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    if (isUserExist) {
        yield prisma_1.prisma.user.update({
            where: { id: isUserExist.id },
            data: {
                token: '',
                password: password,
            },
        });
    }
    else {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'This token has been expired');
    }
});
const getAllAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminsProfile = yield prisma_1.prisma.user.findMany({
        where: {
            role: 'admin',
        },
        include: {
            Profile: true,
        },
    });
    return adminsProfile;
});
exports.UsersService = {
    signup,
    signin,
    forgetPassword,
    resetPassword,
    getAllAdmin,
};
