/* eslint-disable */

export default class SeatReservationService {
  reserveSeat(accountId, totalSeats) {
    if (!Number.isInteger(accountId)) {
      throw new TypeError('accountId must be an integer');
    }

    if (!Number.isInteger(totalSeats)) {
      throw new TypeError('totalSeatsToAllocate must be an integer');
    }
  }
}
