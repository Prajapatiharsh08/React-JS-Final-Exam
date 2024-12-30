import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeReservation } from './actions';
import './reservationform.css'

const ReservationForm = () => {
  const [reservation, setReservation] = useState({ roomId: '', checkIn: '', checkOut: '' });
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  // Filter out available rooms
  const availableRooms = rooms.filter((room) => room.available);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reservation.roomId || !reservation.checkIn || !reservation.checkOut) {
      alert('Please fill all the fields.');
      return;
    }

    // Dispatch the action to make a reservation
    dispatch(makeReservation(reservation));

    // Reset form fields
    setReservation({ roomId: '', checkIn: '', checkOut: '' });
  };

  return (
    <div className="reservation-form-container">
      <h2 className="reservation-form-heading">Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        {/* Room Selection */}
        <div className="room-selection">
          <label>Room</label>
          <select
            className="form-control"
            value={reservation.roomId}
            onChange={(e) => setReservation({ ...reservation, roomId: e.target.value })}
          >
            <option value="">Select Room</option>
            {availableRooms.length > 0 ? (
              availableRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.type} - {room.available ? 'Available' : 'Booked'}
                </option>
              ))
            ) : (
              <option>No available rooms</option>
            )}
          </select>
        </div>

        {/* Check-In Date */}
        <div className="form-group">
          <label>Check-In Date</label>
          <input
            type="date"
            className="form-control"
            value={reservation.checkIn}
            onChange={(e) => setReservation({ ...reservation, checkIn: e.target.value })}
          />
        </div>

        {/* Check-Out Date */}
        <div className="form-group">
          <label>Check-Out Date</label>
          <input
            type="date"
            className="form-control"
            value={reservation.checkOut}
            onChange={(e) => setReservation({ ...reservation, checkOut: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Reserve
        </button>
      </form>

      {/* Rooms Display */}
      <div className="rooms-display mt-4">
        <h4>Available Rooms</h4>
        <div className="rooms-container">
          {availableRooms.length > 0 ? (
            availableRooms.slice(0, 3).map((room) => (
              <div key={room.id} className="room-card">
                <h5>{room.type}</h5>
                <p>{room.features}</p>
                <p>{room.available ? 'Available' : 'Booked'}</p>
              </div>
            ))
          ) : (
            <p>No rooms available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
