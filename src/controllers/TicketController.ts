import { NextFunction, Request, Response } from 'express';
const ObjectId = require('mongoose').Types.ObjectId;
const db_util = require('../utils/db_utils');
const common_util = require('../utils/common_utils');

exports.Book = async (req: Request, res: Response, next: NextFunction) => {
  const ticket = await db_util.bookTicket(req.body, req.body.seat_no, req.body.bus);
  const newticket = await db_util.getTicketInfo(ticket._id);
  common_util.sendResponse(res, newticket);
};

exports.Cancel = async (req: Request, res: Response, next: NextFunction) => {
  await db_util.cancelTicket(req.query.ticketId, req.query.busId, req.query.seat_no);
  const ticket = await db_util.getTicketInfo(req.query.ticketId);
  common_util.sendResponse(res, ticket);
};

exports.Info = async (req: Request, res: Response, next: NextFunction) => {
  if (ObjectId.isValid(req.query.ticketId)) {
    const ticket = await db_util.getTicketInfo(req.query.ticketId);
    common_util.sendResponse(res, ticket);
  } else {
    common_util.sendResponse(res, {});
  }
};
