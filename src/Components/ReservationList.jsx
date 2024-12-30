import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelReservation, fetchReservations } from './actions';
import './reservationlist.css';

const ReservationList = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order (ascending)
  const [sortedReservations, setSortedReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservations on component mount
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  // Update sortedReservations when reservations are fetched
  useEffect(() => {
    if (reservations.length > 0) {
      setSortedReservations(reservations);
      setLoading(false); // Once data is fetched, stop loading
    }
  }, [reservations]);

  // Handle cancellation of a reservation
  const handleCancel = (id) => {
    // Dispatch cancelReservation action to remove the reservation from store
    dispatch(cancelReservation(id));
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting functionality
  const handleSort = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);

    const sorted = [...reservations].sort((a, b) => {
      const dateA = new Date(a.checkIn);
      const dateB = new Date(b.checkIn);
      return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setSortedReservations(sorted);
  };

  // Filter reservations based on search term
  const filteredReservations = sortedReservations.filter((res) =>
    res.roomId.toString().includes(searchTerm) ||
    res.checkIn.includes(searchTerm) ||
    res.checkOut.includes(searchTerm)
  );

  // If loading, show a loading message or spinner
  if (loading) {
    return <div>no reservations...please add</div>;
  }

  return (
    <div className="reservation-list-container">
      <h2 className="reservation-list-heading">Reservations</h2>

      {/* Search Bar */}
      <div className="search-sort-container">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by Room ID, Check-In or Check-Out"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className="form-control sort-select" onChange={handleSort} value={sortOrder}>
          <option value="asc">Sort by Check-In (Ascending)</option>
          <option value="desc">Sort by Check-In (Descending)</option>
        </select>
      </div>

      {/* Reservation List */}
      {filteredReservations.length > 0 ? (
        <ul className="list-group reservation-list">
          {filteredReservations.map((res) => (
            <li key={res.id} className="list-group-item reservation-item">
              <div className="reservation-info">
                <p><strong>Room ID:</strong> {res.roomId}</p>
                <p><strong>Check-In:</strong> {res.checkIn}</p>
                <p><strong>Check-Out:</strong> {res.checkOut}</p>
              </div>
              <button
                className="btn btn-danger btn-sm cancel-btn"
                onClick={() => handleCancel(res.id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default ReservationList;
