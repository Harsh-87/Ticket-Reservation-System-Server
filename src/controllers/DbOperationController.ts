const User = require('../models/user');
const Bus = require('../models/bus');
const Ticket = require('../models/ticket');

exports.getTicketInfo = async (id) => {
  return await Ticket.findById(id).populate('bus');
};

exports.getBusInfoAdmin = async (id) => {
  return await Bus.findById(id).populate('seats.ticket_id');
};

exports.getBuses = async (query) => {
  return await Bus.find({ from: query.from, to: query.to, departure: query.date });
};

exports.createBus = async (data, seatCount) => {
  let seats = [];
  for (let i = 1; i <= seatCount; i++) {
    seats.push({ seat_no: i, ticket_id: null, status: 'open' });
  }
  const bus = new Bus(data);
  bus.seats = seats;
  return await bus.save();
};
