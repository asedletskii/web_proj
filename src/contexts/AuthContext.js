import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Проверяем, есть ли пользователь в localStorage при загрузке
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (userData) => {
        // Здесь будет запрос к API для регистрации
        // Пока просто имитируем успешную регистрацию
        const newUser = {
            ...userData,
            id: Date.now().toString(),
            lists: []
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;