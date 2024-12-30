import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from '../firebase';
import './SignIn.css';

const auth = getAuth(app);

export default function SignIn() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const provider = new GoogleAuthProvider();

    // Google Sign-In
    function signinWithGoogle() {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    // Logout function
    function logout() {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    }

    return (
        <div className="signin-container">
            {!user ? (
                <div className="signin-form">
                    <h2>Sign In with Google</h2>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        className="google-button"
                        onClick={signinWithGoogle}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign In with Google"}
                    </button>
                </div>
            ) : (
                <div className="user-info">
                    <h2>Welcome, {user.displayName}</h2>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
