import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Register = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Простая валидация
        if (password !== confirmPassword) {
            return setError('Пароли не совпадают');
        }

        try {
            // В реальном проекте здесь будет API запрос к backend
            await register({ email, name, password });
            onClose(); // Закрываем модальное окно
            navigate('/profile'); // Перенаправляем на профиль
        } catch (err) {
            setError('Ошибка регистрации. Попробуйте позже.');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal" id="register-modal" onClick={handleBackdropClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Регистрация</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input
                            type="email"
                            id="reg-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите ваш email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-name">Имя</label>
                        <input
                            type="text"
                            id="reg-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Введите ваше имя"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-password">Пароль</label>
                        <input
                            type="password"
                            id="reg-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-confirm-password">Подтверждение пароля</label>
                        <input
                            type="password"
                            id="reg-confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Подтвердите пароль"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="button register-btn">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;