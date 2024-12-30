import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const Navbar = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to signin page after logout if needed
        window.location.href = '/signin';
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Hotel App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ display: 'flex', gap: '20px' }}>
            <li className="nav-item">
              <Link className="nav-link" to="/">Rooms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations">Reservations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reserve">Make Reservation</Link>
            </li>
          </ul>
        </div>
        {/* Logout Button */}
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
