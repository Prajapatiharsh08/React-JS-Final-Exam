import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, editRoom, deleteRoom } from './actions';

const RoomList = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleEdit = (room) => {
    const updatedRoom = { ...room, available: !room.available };
    dispatch(editRoom(room.id, updatedRoom));
  };

  const handleDelete = (id) => {
    dispatch(deleteRoom(id));
  };

  return (
    <div className="room-list-container">
      <h2 className="room-list-heading">Available Rooms</h2>
      <ul className="list-group room-list">
        {rooms.map((room) => (
          <li key={room.id} className="list-group-item room-item">
            <div className="room-info">
              <h5 className="room-title">{room.type}</h5>
              <p className="room-features">{room.features}</p>
              <p className={`room-status ${room.available ? 'available' : 'booked'}`}>
                {room.available ? 'Available' : 'Booked'}
              </p>
            </div>
            <div className="room-actions">
              <button
                className="btn btn-primary btn-sm toggle-btn"
                onClick={() => handleEdit(room)}
              >
                Toggle Availability
              </button>
              <button
                className="btn btn-danger btn-sm delete-btn"
                onClick={() => handleDelete(room.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
