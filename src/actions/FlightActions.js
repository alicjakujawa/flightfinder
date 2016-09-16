import { FLIGHT } from '../constants/ActionTypes';
import FlightApi from '../api/FlightApi';

export function receiveCodes(data) {
  return {
    codes: data,
    type: FLIGHT.CODES_LOADED,
  };
}

export function receiveFlight(data) {
  return {
    flight: data,
    type: FLIGHT.FLIGHT_RECEIVED,
  };
}

export function getCodes() {
  return dispatch => {
    FlightApi.getCodes()
      .then((response) => {
        dispatch(receiveCodes(response.data));
      });
  };
}

export function searchFlight(flight) {
  return dispatch => {
    FlightApi.searchFlight(flight)
      .then((response) => {
        dispatch(receiveFlight(response.data));
      });
  };
}
