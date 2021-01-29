import express, { NextFunction, Request, Response } from 'express';
const auth = require('../authenticate');
const busRouter = express.Router();
const busController = require('../controllers/BusController');
const commonUtil = require('../utils/common_utils');

busRouter
  .route('/')
  .get(busController.findAllBuses)
  .post(auth.verifyAdmin, busController.createBus)
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  });

busRouter
  .route('/:busId')
  .get(busController.getBusInfo)
  .post((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  });

busRouter.route('/:busId/admin').get(auth.verifyAdmin, busController.getBusInfoAdmin);
module.exports = busRouter;
