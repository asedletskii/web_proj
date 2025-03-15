import React from 'react';
import Button from "../Button/Button";
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <header>
            <p>
                <Link to="/" className="text">Wishlify</Link>
            </p>
            <div className="button-container">
                <Button>Тарифы</Button>
                <Link to="/about">
                    <Button>О проекте</Button>
                </Link>
                {user ? (
                    <Button className="signup" onClick={handleProfileClick}>Профиль</Button>
                ) : (
                    <Button className="signup" onClick={handleLoginClick}>Войти</Button>
                )}
            </div>
        </header>
    );
}