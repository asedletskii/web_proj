import React, { useState } from 'react';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from "./components/About/About";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

export default function App() {
    const [showRegister, setShowRegister] = useState(false);

    const toggleRegisterModal = () => {
        setShowRegister(!showRegister);
    };

    return (
        <AuthProvider>
            <Router>
                <Header onLoginClick={() => navigate('/login')} />
                {showRegister && <Register onClose={toggleRegisterModal} />}
                <Routes>
                    <Route path="/" element={<Hero onCreateClick={() => navigate('/login')} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login onRegisterClick={toggleRegisterModal} />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}