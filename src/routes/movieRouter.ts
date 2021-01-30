import express, { NextFunction, Request, Response } from 'express';
const auth = require('../authenticate');
const movieRouter = express.Router();
const movieController = require('../controllers/movieController');
const commonUtil = require('../utils/commonUtils');

movieRouter
  .route('/')
  .get(movieController.findAllMovies)
  .post(auth.verifyAdmin, movieController.createMovie)
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  });

movieRouter
  .route('/:movieId')
  .get(movieController.getMovieInfo)
  .post((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .put((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  })
  .delete((req: Request, res: Response, next: NextFunction) => {
    commonUtil.notSupported(res);
  });

movieRouter.route('/:movieId/admin').get(auth.verifyAdmin, movieController.getMovieInfoAdmin);
module.exports = movieRouter;
