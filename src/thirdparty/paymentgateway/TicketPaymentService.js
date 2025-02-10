/* eslint-disable */

export default class TicketPaymentService {
  makePayment(accountId, totalCost) {
    if (!Number.isInteger(accountId)) {
      throw new TypeError("accountId must be an integer");
    }

    if (!Number.isInteger(totalCost)) {
      throw new TypeError("totalAmountToPay must be an integer");
    }
  }
}
