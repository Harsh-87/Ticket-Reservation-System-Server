import { Response } from 'express';

const userModel = require('../models/userModel');
const movieModel = require('../models/movieModel');
const ticketModel = require('../models/ticketModel');

exports.getTicketInfo = async (ticket_id: String) => {
  return await ticketModel.findById(ticket_id).populate('bus');
};

exports.getBusInfoAdmin = async (bus_id: String) => {
  return await movieModel.findById(bus_id).populate('seats.ticket_id');
};

exports.getBusInfo = async (bus_id: String) => {
  return await movieModel.findById(bus_id);
};

exports.getBuses = async (from: string, to: string, departure: string) => {
  const nextDay = new Date(departure);
  nextDay.setDate(nextDay.getDate() + 1);
  return await movieModel.find({ from: from, to: to, departure: { $gte: departure, $lt: nextDay } });
};

exports.createBus = async (data: any, seatCount: Number) => {
  let seats = [];
  for (let i = 1; i <= seatCount; i++) {
    seats.push({ seat_no: i, ticket_id: null, status: 'open' });
  }
  const bus = new movieModel(data);
  bus.seats = seats;
  return await bus.save();
};

exports.bookTicket = async (details: any, seat_no: Number, bus_id: String) => {
  const bookticket = new ticketModel(details);
  const ticket = await bookticket.save();
  await movieModel.update(
    { _id: bus_id, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': ticket._id, 'seats.$.status': 'close' } },
  );
  return ticket;
};

exports.cancelTicket = async (ticket_id: String, bus_id: String, seat_no: Number) => {
  await movieModel.update(
    { _id: bus_id, 'seats.seat_no': seat_no },
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
