import { NextFunction, Request, Response } from 'express';
const dbUtil = require('../utils/db_utils');
const commonUtil = require('../utils/common_utils');

exports.createBus = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await dbUtil.createBus(req.body, req.body.no_of_seats);
  commonUtil.sendResponse(res, bus);
  return next();
};

exports.findAllBuses = async (req: Request, res: Response, next: NextFunction) => {
  const buses = await dbUtil.getBuses(req.query);
  commonUtil.sendResponse(res, buses);
  return next();
};

exports.getBusInfo = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await dbUtil.getBusInfo(req.params.busId);
  commonUtil.sendResponse(res, bus);
};

exports.getBusInfoAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await dbUtil.getBusInfoAdmin(req.params.busId);
  commonUtil.sendResponse(res, bus);
};
