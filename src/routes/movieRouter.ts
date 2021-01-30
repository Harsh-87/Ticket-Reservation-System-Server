import express, { NextFunction, Request, Response } from 'express';
const auth = require('../authenticate');
const busRouter = express.Router();
const movieController = require('../controllers/movieController');
const commonUtil = require('../utils/commonUtils');

busRouter
  .route('/')
  .get(movieController.findAllBuses)
  .post(auth.verifyAdmin, movieController.createBus)
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  });

busRouter
  .route('/:busId')
  .get(movieController.getBusInfo)
  .post((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  });

busRouter.route('/:busId/admin').get(auth.verifyAdmin, movieController.getBusInfoAdmin);
module.exports = busRouter;
