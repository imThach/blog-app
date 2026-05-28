import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosClient from '../../components/services/api/axiosClient';

export default function BlogDetails() {
    // Lấy id từ URL (ví dụ: /post/123 -> id = 123)
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await axiosClient.get(`/posts/${id}`);
                setPost(response.data || response);
            } catch (error) {
                toast.error('Không thể tải chi tiết bài viết!');
                console.error('Lỗi fetch post details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [id]);

    // Giao diện Spinner khi đang fetch data
    if (loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-5 h-5 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy bài viết</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block">
                    &larr; Quay lại trang chủ
                </Link>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl">
            <div className="flex items-center">
                <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>

            {/* Header bài viết */}
            <header className="mb-8 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-6 text-gray-500 text-sm py-4">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1">
                        <span className="font-medium text-gray-700">{post.author?.username || 'Ẩn danh'}</span>
                    </div>
                </div>
            </header>
            {post.image && (
                <div className="mb-10 rounded-xl overflow-hidden shadow-sm">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto object-cover max-h-[500px]"
                    />
                </div>
            )}
            <div
                className="blog-content text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}