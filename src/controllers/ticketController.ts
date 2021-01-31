import { NextFunction, Request, Response } from 'express';
const ObjectId = require('mongoose').Types.ObjectId;
const dbUtil = require('../utils/dbUtils');
const commonUtil = require('../utils/commonUtils');

exports.Book = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await dbUtil.bookTicket(req.body, req.body.seat_no, req.body.movie);
    const newticket = await dbUtil.getTicketInfo(ticket._id);
    commonUtil.sendResponse(res, newticket);
  } catch (err) {
    next(err);
  }
};

exports.Cancel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbUtil.cancelTicket(req.query.ticketId, req.query.movieId, req.query.seat_no);
    const ticket = await dbUtil.getTicketInfo(req.query.ticketId);
    commonUtil.sendResponse(res, ticket);
  } catch (err) {
    next(err);
  }
};

exports.Info = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (ObjectId.isValid(req.query.ticketId)) {
      const ticket = await dbUtil.getTicketInfo(req.query.ticketId);
      commonUtil.sendResponse(res, ticket);
    } else {
      commonUtil.sendResponse(res, {});
    }
  } catch (err) {
    next(err);
  }
};
