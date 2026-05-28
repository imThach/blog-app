import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosClient from '../services/api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Kiểm tra token khi load lại trang
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Lỗi khi parse JSON từ localStorage:", error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axiosClient.post('/auth/login', { email, password });

            // Đề phòng API trả về key khác nhau (VD: token thay vì accessToken, data.user thay vì user)
            const token = response.accessToken || response.token || response.data?.token;
            const userData = response.user || response.data?.user || response;

            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            toast.success('Đăng nhập thành công!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Email hoặc mật khẩu không đúng!');
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axiosClient.post('/auth/register', { username, email, password });
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            toast.success('Đăng ký thành công!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đăng ký thất bại!');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Đã đăng xuất!');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);