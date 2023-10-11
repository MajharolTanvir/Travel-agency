/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';

const sendResetPasswordWithMail = (
  name: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Reset your Quick tour plan website password here!',
    html:
      '<div><h3 h3 > Dear honorable user ' +
      name +
      ',</h3><p>Are you want to change your website password link? Please click on the following link to <a style="color: blue, font-weight: bold" href = "http://localhost:5000/api/v1/users/reset-password/?token=' +
      token +
      '"> Reset your password </a> on Quick Tour Plan.</p></div>',
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.info('Email sent:', info.response);
      }
    }
  );
};

const signup = async (userData: User) => {
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );
  const user = await prisma.user.create({
    data: userData,
  });

  const { id: userId, email: userEmail, role } = user;
  const accessToken = JwtHelpers.createToken(
    { userId, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.createToken(
    { userId, userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const signin = async (loginData: User) => {
  const { email, password } = loginData;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password as string, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }

  const { id: userId, email: userEmail, role } = isUserExist;
  const accessToken = JwtHelpers.createToken(
    { userId, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.createToken(
    { userId, userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (user) {
    const resetToken = randomstring.generate();
    await prisma.user.update({
      where: { id: user.id },
      data: { token: resetToken },
    });

    const middleName = user?.middleName !== null ? user?.middleName : '';
    const name = user?.firstName + ' ' + middleName + ' ' + user?.lastName;
    sendResetPasswordWithMail(name, user.email, resetToken);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "The user doesn't exist");
  }
};

const resetPassword = async (token: string, password: string) => {
  const isUserExist = await prisma.user.findFirst({ where: { token: token } });

  password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  if (isUserExist) {
    await prisma.user.update({
      where: { id: isUserExist.id },
      data: {
        token: '',
        password: password,
      },
    });
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This token has been expired');
  }
};

export const UsersService = {
  signup,
  signin,
  forgetPassword,
  resetPassword,
};
