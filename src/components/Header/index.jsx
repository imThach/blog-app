import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UserCircle, SquarePen, Moon } from 'lucide-react';
import { useAuth } from '../context/authContext';
import logoImg from '../../assets/logo.png';

export default function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white ">
            <div className="container mx-auto px-30 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-opacity hover:opacity-80">
                    <img src={logoImg} alt="Blog Logo" className="h-8 w-auto object-contain" />
                </Link>

                {/* Navigation & Actions */}
                <div className="flex items-center gap-4">

                    {/* Nút Create Blog */}
                    <Link
                        to="/create-blog"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        + Create Blog
                    </Link>
                    {/* Nút toggle Light/Dark Mode */}
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Đổi giao diện">
                        <Moon className="h-5 w-5" />
                    </button>

                    {/* User Menu */}
                    <div className="relative cursor-pointer" ref={menuRef}>
                        <div
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <UserCircle className="h-7 w-7 text-gray-600" />
                        </div>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 transition-all">
                                {!user ? (
                                    <>
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Đăng nhập</Link>
                                        <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Đăng ký</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/my-posts" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bài viết của tôi</Link>

                                        <div className="h-px bg-gray-200 my-1"></div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                        >
                                            Đăng xuất
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}