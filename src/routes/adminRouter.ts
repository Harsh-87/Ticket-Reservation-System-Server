import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
const adminRouter = express.Router();
const commonUtil = require('../utils/common_utils');
const authController = require('../controllers/authController');

adminRouter.route('/login').post(passport.authenticate('local'), authController.Login);

adminRouter.route('/register').post(authController.Signup);

adminRouter.route('/logout').get(authController.Logout);

module.exports = adminRouter;
