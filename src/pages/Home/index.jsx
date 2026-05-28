import { useState, useEffect } from 'react';
import axiosClient from '../../components/services/api/axiosClient';
import CardBlog from '../../components/CardBlog';
import toast from 'react-hot-toast';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosClient.get('/posts');
                setPosts(response.items || []);
            } catch (error) {
                toast.error('Không thể tải danh sách bài viết!');
                console.error('Lỗi fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Bài viết mới nhất</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                            <div className="bg-gray-200 aspect-video w-full"></div>
                            <div className="p-5 space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Bài viết mới nhất</h1>
                <span className="text-gray-500 text-sm">{posts.length} bài viết</span>
            </div>
            {posts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="text-gray-400 mb-4 text-6xl">📭</div>
                    <h2 className="text-xl font-semibold text-gray-700">Chưa có bài viết nào</h2>
                    <p className="text-gray-500 mt-2">Hãy trở thành người đầu tiên viết bài!</p>
                </div>
            ) : (
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <CardBlog key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}