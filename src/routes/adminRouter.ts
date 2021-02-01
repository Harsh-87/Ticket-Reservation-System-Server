import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
const adminRouter = express.Router();
const commonUtil = require('../utils/common_utils');
const authController = require('../controllers/authController');
const auth = require('../authenticate');

adminRouter.route('/login').post(passport.authenticate('local'), authController.Login);

adminRouter.route('/register').post(authController.Signup);

adminRouter.route('/logout').get(authController.Logout);

adminRouter.route('/verifyAdmin').get(auth.verifyAdmin, (req: Request, res: Response, next: NextFunction) => {
  console.log('request user', req.user);
  return res.status(200).send({ msg: 'valid', user: req.user });
});

module.exports = adminRouter;
