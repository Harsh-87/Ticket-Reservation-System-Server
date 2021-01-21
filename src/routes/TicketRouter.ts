import express, { NextFunction, Request, Response } from 'express';
const ticketRouter = express.Router();
const common_util = require('../utils/common_utils');
const ticket_controller = require('../controllers/TicketController');

ticketRouter
  .route('/')
  .get(ticket_controller.Info)
  .post(ticket_controller.Book)
  .put((req: Request, res: Response, next: NextFunction) => {
    common_util.notSupported(res);
  })
  .delete(ticket_controller.Cancel);

module.exports = ticketRouter;
