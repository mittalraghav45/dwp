//handles business logic
import InvalidPurchaseException from "./InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  purchaseTickets(accountId, ...ticketTypeRequests) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException("Invalid account ID");
    }

    let totalTickets = 0;
    let totalCost = 0;
    let adultTickets = 0;
    let childTickets = 0;
    let infantTickets = 0;
    let totalSeats = 0;

    ticketTypeRequests.forEach((request) => {
      const type = request.getTicketType();
      const count = request.getNoOfTickets();

      totalTickets += count;
      if (type === "ADULT") {
        totalCost += count * 25;
        adultTickets += count;
      } else if (type === "CHILD") {
        totalCost += count * 15;
        childTickets += count;
      } else if (type === "INFANT") {
        infantTickets += count;
      }
      totalSeats = adultTickets + childTickets;
    });

    if (totalTickets > 25) {
      throw new InvalidPurchaseException(
        "Cannot purchase more than 25 tickets at a time"
      );
    }

    if ((childTickets > 0 || infantTickets > 0) && adultTickets === 0) {
      throw new InvalidPurchaseException(
        "Child and Infant tickets cannot be purchased without an Adult ticket"
      );
    }

    let message = `Cost for ${adultTickets} adults, ${childTickets} children and ${infantTickets} infants is:£${totalCost}. Number of Seats reserved:${totalSeats}`;

    const paymentService = new TicketPaymentService();
    const seatService = new SeatReservationService();

    paymentService.makePayment(accountId, totalCost);
    seatService.reserveSeat(accountId, totalSeats);

    return message;
  }
}
