// src/reducer.js
import {
  FETCH_ROOMS,
  FETCH_RESERVATIONS,
  MAKE_RESERVATION,
  CANCEL_RESERVATION,
} from './actions';

const initialState = {
  rooms: [],
  reservations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return { ...state, rooms: action.payload };
    case FETCH_RESERVATIONS:
      return { ...state, reservations: action.payload };
    case MAKE_RESERVATION:
      return { ...state, reservations: [...state.reservations, action.payload] };
    case CANCEL_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter((res) => res.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
