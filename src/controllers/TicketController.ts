import { NextFunction, Request, Response } from 'express';
const ObjectId = require('mongoose').Types.ObjectId;
const dbUtil = require('../utils/db_utils');
const commonUtil = require('../utils/common_utils');

exports.Book = async (req: Request, res: Response, next: NextFunction) => {
  const ticket = await dbUtil.bookTicket(req.body, req.body.seat_no, req.body.bus);
  const newticket = await dbUtil.getTicketInfo(ticket._id);
  commonUtil.sendResponse(res, newticket);
};

exports.Cancel = async (req: Request, res: Response, next: NextFunction) => {
  await dbUtil.cancelTicket(req.query.ticketId, req.query.busId, req.query.seat_no);
  const ticket = await dbUtil.getTicketInfo(req.query.ticketId);
  commonUtil.sendResponse(res, ticket);
};

exports.Info = async (req: Request, res: Response, next: NextFunction) => {
  if (ObjectId.isValid(req.query.ticketId)) {
    const ticket = await dbUtil.getTicketInfo(req.query.ticketId);
    commonUtil.sendResponse(res, ticket);
  } else {
    commonUtil.sendResponse(res, {});
  }
};
