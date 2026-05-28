import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<Layout />}>

        {/* Nhóm 1: Ai cũng vào được (Public) */}
        <Route index element={<Home />} />
        <Route path="post/:id" element={<BlogDetails />} />

        {/* Nhóm 2: Phải đăng nhập mới vào được (User + Admin) */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          {/* Đã xóa thẻ create-blog trùng lặp ở trên và đưa vào đây */}
          <Route path="create-blog" element={<div className="p-8 text-xl">Trang Tạo Bài Viết (Đang xây dựng)</div>} />
          <Route path="my-posts" element={<div className="p-8 text-xl">Trang Quản lý Bài Viết Cá Nhân (Đang xây dựng)</div>} />
        </Route>

        {/* Nhóm 3: Cấm địa (Chỉ Admin) */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="user-management" element={<div className="p-8 text-xl font-bold text-purple-600">Trang Quản Lý User (Dành riêng cho Admin)</div>} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;