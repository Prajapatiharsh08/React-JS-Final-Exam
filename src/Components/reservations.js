// src/reducers/reservations.js
const reservationsReducer = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RESERVATION_BY_ID':
        return state.find((reservation) => reservation.id === action.payload);
      case 'UPDATE_RESERVATION':
        return state.map((reservation) =>
          reservation.id === action.payload.id ? { ...reservation, ...action.payload.updatedReservation } : reservation
        );
      // other cases...
      default:
        return state;
    }
  };
  
  export default reservationsReducer;
  