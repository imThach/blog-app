import { Link } from 'react-router-dom';

export default function CardBlog({ post }) {
    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const excerpt = stripHtml(post.content).substring(0, 120) + '...';

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            {/* Thumbnail */}
            <Link to={`/post/${post._id}`} className="overflow-hidden aspect-video relative">
                <img
                    src={post.image || 'https://placehold.co/600x400?text=No+Image'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Nội dung Card */}
            <div className="p-5 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Tiêu đề */}
                <Link to={`/post/${post._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                        {post.title}
                    </h3>
                </Link>

                {/* Nội dung rút gọn */}
                <p className="text-gray-600 text-xs mb-4 line-clamp-3 flex-1">
                    {excerpt}
                </p>

            </div>
        </div>
    );
}