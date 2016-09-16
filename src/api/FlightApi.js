import axios from 'axios';

const FLIGHT_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/';

export default {
  getCodes() {
    return axios.get(`${FLIGHT_URL}forms/flight-booking-selector/`);
  },

  searchFlight(flight) {
    const DATA = `
      from/${flight.origin}/to/${flight.destination}/${flight.startDate}/${flight.endDate}/
    `;
    return axios.get(`${FLIGHT_URL}flights/${DATA}250/unique/?limit=15&offset-0`);
  },
};
