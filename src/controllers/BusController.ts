import { NextFunction, Request, Response } from 'express';
const dbUtil = require('../utils/db_utils');
const commonUtil = require('../utils/common_utils');

exports.createBus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bus = await dbUtil.createBus(req.body, req.body.no_of_seats);
    commonUtil.sendResponse(res, bus);
    return next();
  } catch (err) {
    next(err);
  }
};

exports.findAllBuses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const buses = await dbUtil.getBuses(req.query.from, req.query.to, req.query.departure);
    commonUtil.sendResponse(res, buses);
    return next();
  } catch (err) {
    next(err);
  }
};

exports.getBusInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bus = await dbUtil.getBusInfo(req.params.busId);
    commonUtil.sendResponse(res, bus);
  } catch (err) {
    next(err);
  }
};

exports.getBusInfoAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bus = await dbUtil.getBusInfoAdmin(req.params.busId);
    commonUtil.sendResponse(res, bus);
  } catch (err) {
    next(err);
  }
};
