// server.js
import express from 'express';
import TicketService from './pairtest/TicketService.js';
import TicketTypeRequest from './pairtest/TicketTypeRequest.js';

const app = express();
app.use(express.json());

app.post('/purchase', (req, res) => {
  try {
    const { accountId, tickets } = req.body;
    const ticketRequests = tickets.map(ticket => new TicketTypeRequest(ticket.type, ticket.count));
    const ticketService = new TicketService();
    ticketService.purchaseTickets(accountId, ...ticketRequests);
    res.status(200).send({ message: 'Tickets purchased successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));