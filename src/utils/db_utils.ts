import { Response } from 'express';

const User = require('../models/user');
const Bus = require('../models/bus');
const Ticket = require('../models/ticket');

exports.getTicketInfo = async (ticket_id: String) => {
  return await Ticket.findById(ticket_id).populate('bus');
};

exports.getBusInfoAdmin = async (bus_id: String) => {
  return await Bus.findById(bus_id).populate('seats.ticket_id');
};

exports.getBusInfo = async (bus_id: String) => {
  return await Bus.findById(bus_id);
};

exports.getBuses = async (query: any) => {
  return await Bus.find({ from: query.from, to: query.to, departure: query.departure });
};

exports.createBus = async (data: any, seatCount: Number) => {
  let seats = [];
  for (let i = 1; i <= seatCount; i++) {
    seats.push({ seat_no: i, ticket_id: null, status: 'open' });
  }
  const bus = new Bus(data);
  bus.seats = seats;
  return await bus.save();
};

exports.bookTicket = async (details: any, seat_no: Number, bus_id: String) => {
  const bookticket = new Ticket(details);
  const ticket = await bookticket.save();
  await Bus.update(
    { _id: bus_id, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': ticket._id, 'seats.$.status': 'close' } },
  );
  return ticket;
};

exports.cancelTicket = async (ticket_id: String, bus_id: String, seat_no: Number) => {
  await Bus.update(
    { _id: bus_id, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': null, 'seats.$.status': 'open' } },
  );
  return await Ticket.update({ _id: ticket_id }, { status: 'Cancelled' });
};

exports.register = (username: String, password: String, email: String, res: Response) => {
  User.register(new User({ username: username }), password, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (email) user.email = email;
      user.save((err, user) => {
        if (err) res.status(500).end(err);
        else res.status(200).json(user);
      });
    }
  });
};
