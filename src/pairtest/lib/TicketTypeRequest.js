export default class TicketTypeRequest {
  static Types = ["ADULT", "CHILD", "INFANT"];

  #type;
  #noOfTickets;
  #accountId;

  constructor(accountId, type, noOfTickets) {
    this.validateType(type);
    this.validateNoOfTickets(noOfTickets, type,accountId);

    this.#type = type;
    this.#noOfTickets = noOfTickets;
    this.#accountId = accountId;
  }

  validateType(type) {
    if (!TicketTypeRequest.Types.includes(type)) {
      throw new TypeError(
        `type must be one of ${TicketTypeRequest.Types.join(", ")}`
      );
    }
  }

  validateNoOfTickets(noOfTickets, type, accountId) {

    if (Number.isInteger(accountId) && accountId >0) {
      // console.log('heer ',accountId)
      if (noOfTickets < 0) {
        throw new TypeError("noOfTickets must be a positive integer");
      }
      if (noOfTickets === 0 && type === "ADULT") {
        throw new TypeError("Purchase of Adult ticket is mandatory");
      }
      if (!Number.isInteger(noOfTickets)) {
        throw new TypeError("noOfTickets must be a positive integer");
      }
    }
    else{
      throw new TypeError("Account ID is incorrect");

    }
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }
}
