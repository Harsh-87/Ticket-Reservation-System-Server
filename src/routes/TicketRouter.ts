import express, { NextFunction, Request, Response } from 'express';
const ticketRouter = express.Router();
const commonUtil = require('../utils/common_utils');
const ticketController = require('../controllers/TicketController');

ticketRouter
  .route('/')
  .get(ticketController.Info)
  .post(ticketController.Book)
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete(ticketController.Cancel);

module.exports = ticketRouter;
