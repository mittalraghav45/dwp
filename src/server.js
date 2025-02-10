import express from "express";
import TicketService from "./pairtest/TicketService.js";
import TicketTypeRequest from "./pairtest/lib/TicketTypeRequest.js";

const app = express();
app.use(express.json());

app.post("/purchase", (req, res) => {
  try {
    const { accountId, tickets } = req.body; 
    const ticketRequests = tickets.map(
      (ticket) => new TicketTypeRequest(accountId, ticket.type, ticket.noOfTickets)
    );

    const ticketService = new TicketService();
    const purchaseMessage = ticketService.purchaseTickets(accountId, ...ticketRequests);

    res.status(200).send({ message: purchaseMessage });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error. Please try again later." });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found. Please check the URL." });
});

app.listen(3000, () => console.log("Server running on port 3000"));