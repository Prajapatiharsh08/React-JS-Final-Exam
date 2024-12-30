// src/actions.js
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const MAKE_RESERVATION = 'MAKE_RESERVATION';
export const CANCEL_RESERVATION = 'CANCEL_RESERVATION';

export const fetchRooms = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/rooms');
    const data = await response.json();
    dispatch({ type: FETCH_ROOMS, payload: data });
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};

export const fetchReservations = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/reservations');
    const data = await response.json();
    dispatch({ type: FETCH_RESERVATIONS, payload: data });
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
};

export const makeReservation = (reservation) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    });
    const data = await response.json();
    dispatch({ type: MAKE_RESERVATION, payload: data });
  } catch (error) {
    console.error('Error making reservation:', error);
  }
};

export const cancelReservation = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3000/reservations/${id}`, { method: 'DELETE' });
    dispatch({ type: CANCEL_RESERVATION, payload: id });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
  }
};

export const editRoom = (id, updatedRoom) => async (dispatch) => {
    const response = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRoom),
    });
    const data = await response.json();
    dispatch(fetchRooms()); // Refresh rooms after update
  };
  
  export const deleteRoom = (id) => async (dispatch) => {
    await fetch(`http://localhost:3000/rooms/${id}`, { method: 'DELETE' });
    dispatch(fetchRooms()); // Refresh rooms after delete
  };
  
  // src/actions.js
export const updateReservation = (updatedReservation, id) => ({
    type: 'UPDATE_RESERVATION',
    payload: { updatedReservation, id },
  });
  
  export const fetchReservationById = (id) => ({
    type: 'FETCH_RESERVATION_BY_ID',
    payload: id,
  });
  