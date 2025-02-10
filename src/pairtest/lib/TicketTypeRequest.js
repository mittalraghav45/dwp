export default class TicketTypeRequest {
  static Types = ["ADULT", "CHILD", "INFANT"];

  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    this.validateType(type);
    this.validateNoOfTickets(noOfTickets, type);

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  validateType(type) {
    if (!TicketTypeRequest.Types.includes(type)) {
      throw new TypeError(`type must be one of ${TicketTypeRequest.Types.join(", ")}`);
    }
  }

  validateNoOfTickets(noOfTickets, type) {
    if (noOfTickets < 0) {
      throw new TypeError("noOfTickets must be a positive integer");
    }
    if (noOfTickets === 0 && type === "ADULT") {
      throw new TypeError("No tickets purchased");
    }
    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError("noOfTickets must be a positive integer");
    }
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }
}