// RoomDetails Component
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams();
  const room = useSelector(state => state.rooms.find(r => r.id === parseInt(id)));

  if (!room) return <div>Room not found</div>;

  return (
    <div>
      <h2>Room Details</h2>
      <p>Type: {room.type}</p>
      <p>Features: {room.features}</p>
      <p>Status: {room.available ? 'Available' : 'Booked'}</p>
    </div>
  );
};

export default RoomDetails;