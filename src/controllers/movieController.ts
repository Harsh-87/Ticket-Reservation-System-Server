import { NextFunction, Request, Response } from 'express';
const dbUtil = require('../utils/dbUtils');
const commonUtil = require('../utils/commonUtils');

exports.createMovie = async (req: Request, res: Response, next: NextFunction) => {
  const DEFAULT_NUM_SEATS = 40;
  try {
    const movie = await dbUtil.createMovie(req.body, req.body.no_of_seats || DEFAULT_NUM_SEATS);
    commonUtil.sendResponse(res, movie);
  } catch (err) {
    next(err);
  }
};

exports.findAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await dbUtil.getMovies(req.query.title, req.query.timing);
    commonUtil.sendResponse(res, movies);
  } catch (err) {
    next(err);
  }
};

exports.getMovieInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await dbUtil.getMovieInfo(req.params.movieId);
    commonUtil.sendResponse(res, movie);
  } catch (err) {
    next(err);
  }
};

exports.getMovieInfoAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await dbUtil.getMovieInfoAdmin(req.params.movieId);
    commonUtil.sendResponse(res, movie);
  } catch (err) {
    next(err);
  }
};
