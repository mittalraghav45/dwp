// lib/TicketTypeRequest.js
export default class TicketTypeRequest {
  static Types = ['ADULT', 'CHILD', 'INFANT'];

  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!TicketTypeRequest.Types.includes(type)) {
      throw new TypeError(`type must be one of ${TicketTypeRequest.Types.join(', ')}`);
    }
    if ( noOfTickets <= 0) {  
      throw new TypeError('noOfTickets for Adults must be greater than 0');
    }
    if (!Number.isInteger(noOfTickets)) {  
      
      throw new TypeError(typeof(noOfTickets)+'  noOfTickets must be a positive integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }
}