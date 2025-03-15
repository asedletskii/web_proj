import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // В реальном проекте здесь будет API запрос к backend
            // Пока для демонстрации используем моковые данные
            if (email && password) {
                // Имитация успешного входа
                const userData = {
                    id: '1',
                    email,
                    name: email.split('@')[0],
                    lists: [
                        {
                            id: '1',
                            name: 'Список желаний',
                            items: [
                                { id: '1', name: 'iPhone 15 Pro', price: '99990', marketplace: 'Ozon', imageUrl: 'https://via.placeholder.com/150' },
                                { id: '2', name: 'MacBook Air M2', price: '119990', marketplace: 'Wildberries', imageUrl: 'https://via.placeholder.com/150' }
                            ]
                        },
                        {
                            id: '2',
                            name: 'День рождения',
                            items: [
                                { id: '3', name: 'PlayStation 5', price: '59990', marketplace: 'Ozon', imageUrl: 'https://via.placeholder.com/150' }
                            ]
                        },
                        {
                            id: '3',
                            name: 'Подарки родителям',
                            items: [
                                { id: '4', name: 'Кофемашина', price: '29990', marketplace: 'DNS', imageUrl: 'https://via.placeholder.com/150' }
                            ]
                        }
                    ]
                };

                login(userData);
                navigate('/profile');
            } else {
                setError('Пожалуйста, заполните все поля');
            }
        } catch (err) {
            setError('Ошибка входа. Проверьте email и пароль.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Вход в аккаунт</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите ваш email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="button login-btn">Войти</button>
                    </div>
                </form>
                <div className="auth-links">
                    <p>Еще нет аккаунта? <span className="register-link" onClick={() => document.getElementById('register-modal').style.display = 'flex'}>Зарегистрироваться</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;