import { NextFunction, Request, Response } from 'express';
const db_util = require('../utils/db_utils');
const common_util = require('../utils/common_utils');

exports.createBus = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await db_util.createBus(req.body, req.body.no_of_seats);
  common_util.sendResponse(res, bus);
};

exports.findAllBuses = async (req: Request, res: Response, next: NextFunction) => {
  const buses = await db_util.getBuses(req.params);
  common_util.sendResponse(res, buses);
};

exports.getBusInfo = async (req: Request, res: Response, next: NextFunction) => {
  const bus = await db_util.getBus(req.params.busId);
  common_util.sendResponse(res, bus);
};
