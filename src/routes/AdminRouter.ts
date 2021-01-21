import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
const adminRouter = express.Router();
const common_util = require('../utils/common_utils');
const auth_controller = require('../controllers/AuthController');

adminRouter.route('/login').post(passport.authenticate('local'), auth_controller.Login);

adminRouter.route('/register').post(auth_controller.Signup);

adminRouter.route('/logout').get(auth_controller.Logout);

module.exports = adminRouter;
