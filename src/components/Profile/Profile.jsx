import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeList, setActiveList] = useState(null);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        if (!user) {
            navigate('/login');
            return;
        }

        // Загружаем списки пользователя
        setLists(user.lists || []);

        // Устанавливаем первый список как активный по умолчанию
        if (user.lists && user.lists.length > 0) {
            setActiveList(user.lists[0]);
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleListClick = (list) => {
        setActiveList(list);
    };

    const getItemsCount = (list) => {
        return list.items ? list.items.length : 0;
    };

    if (!user) {
        return null; // Или можно показать спиннер загрузки
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {/* Заглушка для аватара */}
                    </div>
                    <div className="profile-details">
                        <h2>{user.name}</h2>
                        <p className="profile-stat">Кол-во списков: {lists.length}</p>
                    </div>
                </div>
                <div className="profile-actions">
                    <Button onClick={handleLogout}>Выйти</Button>
                </div>
            </div>

            <div className="lists-section">
                <div className="lists-header">
                    {lists.map((list) => (
                        <div
                            key={list.id}
                            className={`list-tab ${activeList && activeList.id === list.id ? 'active' : ''}`}
                            onClick={() => handleListClick(list)}
                        >
                            <h3>{list.name}</h3>
                            <p>кол-во товаров в списке: {getItemsCount(list)}</p>
                        </div>
                    ))}
                    <div className="list-tab new-list">
                        <button className="button add-list-btn">+ Создать список</button>
                    </div>
                </div>

                {activeList && (
                    <div className="items-grid">
                        {activeList.items && activeList.items.length > 0 ? (
                            activeList.items.map((item) => (
                                <div className="item-card" key={item.id}>
                                    <div className="item-image">
                                        <img src={item.imageUrl} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p className="item-marketplace">{item.marketplace}</p>
                                        <p className="item-price">Цена: {item.price} ₽</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-list">
                                <p>В этом списке пока нет товаров</p>
                                <Button>Добавить товар</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;