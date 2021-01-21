import { NextFunction, Request, Response } from 'express';
const common_util = require('../utils/common_utils');
const db_util = require('../utils/db_utils');

exports.Login = (req: Request, res: Response, next: NextFunction) => {
  common_util.sendResponse(res, { success: true, status: 'You are successfully logged in!', user: req.user });
};

exports.Logout = (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    req.logOut();
    common_util.sendResponse(res, { success: true, status: 'You are successfully logged out!' });
    next();
  } else {
    next(new Error('You are not logged in!'));
  }
};

exports.Signup = async (req: Request, res: Response, next: NextFunction) => {
  await db_util.register(req.body.username, req.body.password, req.body.email, res);
};
