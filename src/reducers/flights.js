import { FLIGHT } from '../constants/ActionTypes';

const initialState = {
  airports: [],
};

export default function flight(state = initialState, action) {
  switch (action.type) {
    case FLIGHT.CODES_LOADED:
      return {
        ...state,
        airports: action.codes.airports,
      };

    case FLIGHT.FLIGHT_RECEIVED:
      return {
        ...state,
        results: action.flight,
      };

    case FLIGHT.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
