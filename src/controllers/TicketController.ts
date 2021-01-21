import { NextFunction, Request, Response } from 'express';
const db_util = require('../utils/db_utils');
const common_util = require('../utils/common_utils');

exports.Book = async (req: Request, res: Response, next: NextFunction) => {
  const ticket = await db_util.bookTicket(req.body, req.body.seat_no, req.body.bus);
  common_util.sendResponse(res, ticket);
};

exports.Cancel = async (req: Request, res: Response, next: NextFunction) => {
  const ticket = await db_util.cancelTicket(req.params.ticketid, req.params.busId, req.params.seat_no);
  common_util.sendResponse(res, ticket);
};

exports.Info = async (req: Request, res: Response, next: NextFunction) => {
  const ticket = await db_util.getTicketInfo(req.params.ticketId);
  common_util.sendResponse(res, ticket);
};
