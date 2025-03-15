import React, { useState } from 'react';
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import About from "./components/About/About";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// Create a wrapper component to use hooks inside App
const AppContent = () => {
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    const toggleRegisterModal = () => {
        setShowRegister(!showRegister);
    };

    return (
        <>
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
        </>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent/>
            </Router>
        </AuthProvider>
    );
}
//TEST