import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import logger = require('morgan');
import passport from 'passport';
import path from 'path';
const app = express();
const config = require('./config');
const busRouter = require('./routes/BusRouter');
const ticketRouter = require('./routes/TicketRouter');
const adminRouter = require('./routes/AdminRouter');

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then(
  (db) => {
    console.log('Connected correctly to server');
  },
  (err) => {
    console.log(err);
  },
);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRouter);
app.use('/bus', busRouter);
app.use('/ticket', ticketRouter);

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ err: err.message });
};
app.use(errorHandler);

const port = config.port || 5000;
app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
