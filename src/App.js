import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RoomList from './Components/RoomList';
import ReservationForm from './Components/ReservationForm';
import ReservationList from './Components/ReservationList';
import SignIn from './Components/SignIn';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

// ProtectedRoute component that waits for the authentication state to load
const ProtectedRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to wait for auth state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is signed in
      } else {
        setIsAuthenticated(false); // User is not signed in
      }
    });

    return unsubscribe;
  }, []);

  // If the authentication state is still loading, we return nothing or a loading screen
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/signin" />;
};

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      {/* Protecting routes that need authentication */}
      <Route path="/" element={<ProtectedRoute element={<RoomList />} />} />
      <Route path="/reservations" element={<ProtectedRoute element={<ReservationList />} />} />
      <Route path="/reserve" element={<ProtectedRoute element={<ReservationForm />} />} />
      {/* Sign-in route without protection */}
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
);

export default App;
