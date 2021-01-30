import { NextFunction, Request, Response } from 'express';
const commonUtil = require('../utils/commonUtils');
const dbUtil = require('../utils/dbUtils');

exports.Login = (req: Request, res: Response, next: NextFunction) => {
  commonUtil.sendResponse(res, { success: true, status: 'You are successfully logged in!', user: req.user });
};

exports.Logout = (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    req.logOut();
    commonUtil.sendResponse(res, { success: true, status: 'You are successfully logged out!' });
  } else {
    next(new Error('You are not logged in!'));
  }
};

exports.Signup = async (req: Request, res: Response, next: NextFunction) => {
  const callback = (err: any, user: any) => {
    if (err) res.status(500).end(err);
    else res.status(200).json(user);
  };
  await dbUtil.register(req.body.username, req.body.password, req.body.email, callback);
};
