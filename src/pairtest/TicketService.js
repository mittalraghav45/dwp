//handles business logic
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.validateAccountId(accountId);

    const {
      totalTickets,
      totalCost,
      adultTickets,
      childTickets,
      infantTickets,
      totalSeats,
    } = this.calculateTicketDetails(ticketTypeRequests);

    this.validateTicketPurchase(
      totalTickets,
      adultTickets,
      childTickets,
      infantTickets
    );

    const message = this.generatePurchaseMessage(
      adultTickets,
      childTickets,
      infantTickets,
      totalCost,
      totalSeats
    );

    this.processPaymentAndReservation(accountId, totalCost, totalSeats);

    return message;
  }

  validateAccountId(accountId) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException("Invalid account ID");
    }
  }

  calculateTicketDetails(ticketTypeRequests) {
    let totalTickets = 0;
    let totalCost = 0;
    let adultTickets = 0;
    let childTickets = 0;
    let infantTickets = 0;

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
    });

    const totalSeats = adultTickets + childTickets;

    return {
      totalTickets,
      totalCost,
      adultTickets,
      childTickets,
      infantTickets,
      totalSeats,
    };
  }

  validateTicketPurchase(
    totalTickets,
    adultTickets,
    childTickets,
    infantTickets
  ) {
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
  }

  generatePurchaseMessage(
    adultTickets,
    childTickets,
    infantTickets,
    totalCost,
    totalSeats
  ) {
    return `Cost for ${adultTickets} adults, ${childTickets} children and ${infantTickets} infants is: £${totalCost}. Number of Seats reserved: ${totalSeats}`;
  }

  processPaymentAndReservation(accountId, totalCost, totalSeats) {
    const paymentService = new TicketPaymentService();
    const seatService = new SeatReservationService();

    paymentService.makePayment(accountId, totalCost);
    seatService.reserveSeat(accountId, totalSeats);
  }
}
