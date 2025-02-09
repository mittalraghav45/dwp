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
      throw new TypeError('here noOfTickets must be a positive integer');
    }
    if (!Number.isInteger(noOfTickets)) {  
      console.log(typeof(noOfTickets));
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