import { Response } from 'express';

const userModel = require('../models/userModel');
const movieModel = require('../models/movieModel');
const ticketModel = require('../models/ticketModel');

exports.getTicketInfo = async (ticket_id: String) => {
  return await ticketModel.findById(ticket_id).populate('movie');
};

exports.getMovieInfoAdmin = async (movieId: String) => {
  return await movieModel.findById(movieId).populate('seats.ticket_id');
};

exports.getMovieInfo = async (movieId: String) => {
  return await movieModel.findById(movieId);
};

exports.getMovies = async (title: String, timing: string) => {
  const nextDay = new Date(timing);
  nextDay.setDate(nextDay.getDate() + 1);
  return await movieModel.find({ title: title, timing: { $gte: timing, $lt: nextDay } });
};

exports.createMovie = async (data: any, seatCount: Number) => {
  let seats = [];
  for (let i = 1; i <= seatCount; i++) {
    seats.push({ seat_no: i, ticket_id: null, status: 'open' });
  }
  const movie = new movieModel(data);
  movie.seats = seats;
  return await movie.save();
};

exports.bookTicket = async (details: any, seat_no: Number, movieId: String) => {
  const bookticket = new ticketModel(details);
  const ticket = await bookticket.save();
  await movieModel.update(
    { _id: movieId, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': ticket._id, 'seats.$.status': 'close' } },
  );
  return ticket;
};

exports.cancelTicket = async (ticket_id: String, movieId: String, seat_no: Number) => {
  await movieModel.update(
    { _id: movieId, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': null, 'seats.$.status': 'open' } },
  );
  return await ticketModel.update({ _id: ticket_id }, { status: 'Cancelled' });
};

exports.register = (username: String, password: String, email: String, callback: Function) => {
  userModel.register(new userModel({ username: username }), password, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (email) user.email = email;
      user.save((err, user) => {
        callback(err, user);
      });
    }
  });
};
