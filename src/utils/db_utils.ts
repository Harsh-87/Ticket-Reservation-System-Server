const User = require('../models/user');
const Bus = require('../models/bus');
const Ticket = require('../models/ticket');

exports.getTicketInfo = async (ticket_id) => {
  return await Ticket.findById(ticket_id).populate('bus');
};

exports.getBusInfoAdmin = async (bus_id) => {
  return await Bus.findById(bus_id).populate('seats.ticket_id');
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

exports.bookTicket = async (details, seat_no, bus_id) => {
  const bookticket = new Ticket(details);
  const ticket = await bookticket.save();
  await Bus.update(
    { _id: bus_id, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': ticket._id, 'seats.$.status': 'close' } },
  );
  return ticket;
};

exports.cancelTicket = async (ticket_id, bus_id, seat_no) => {
  await Bus.update(
    { _id: bus_id, 'seats.seat_no': seat_no },
    { $set: { 'seats.$.ticket_id': null, 'seats.$.status': 'open' } },
  );
  return await Ticket.update({ _id: ticket_id }, { status: 'Cancelled' });
};
