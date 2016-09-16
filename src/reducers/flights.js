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

    default:
      return state;
  }
}
