import { NextFunction, Request, Response } from 'express';
const db_util = require('../utils/db_utils');
const common_util = require('../utils/common_utils');

exports.createBus = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await db_util.createBus(req.body, req.body.no_of_seats);
  common_util.sendResponse(res, bus);
  return next();
};

exports.findAllBuses = async (req: Request, res: Response, next: NextFunction) => {
  const buses = await db_util.getBuses(req.query);
  common_util.sendResponse(res, buses);
  return next();
};

exports.getBusInfo = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await db_util.getBusInfo(req.params.busId);
  common_util.sendResponse(res, bus);
};
