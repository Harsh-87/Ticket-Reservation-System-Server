import express, { NextFunction, Request, Response } from 'express';
const auth = require('../Authenticate');
const busRouter = express.Router();
const bus_controller = require('../controllers/BusController');
const common_util = require('../utils/common_utils');

busRouter
  .route('/')
  .get(bus_controller.findAllBuses)
  .post(auth.verifyAdmin, bus_controller.createBus)
  .put((req: Request, res: Response, next: NextFunction) => {
    common_util.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    common_util.notSupported(res);
  });

busRouter
  .route('/:busId')
  .get(bus_controller.getBusInfo)
  .post((req: Request, res: Response, next: NextFunction) => {
    common_util.notSupported(res);
  })
  .put((req: Request, res: Response, next: NextFunction) => {
    common_util.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    common_util.notSupported(res);
  });

module.exports = busRouter;
