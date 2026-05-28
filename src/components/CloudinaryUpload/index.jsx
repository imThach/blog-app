import { useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CloudinaryUpload({ value, onChange }) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate định dạng và dung lượng (vd: tối đa 5MB)
        if (!file.type.includes('image/')) {
            return toast.error('Vui lòng chọn file hình ảnh!');
        }
        if (file.size > 5 * 1024 * 1024) {
            return toast.error('Kích thước ảnh tối đa là 5MB!');
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.secure_url) {
                onChange(data.secure_url); // Trả link ảnh về cho trang CreateBlog
                toast.success('Tải ảnh lên thành công!');
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Lỗi upload ảnh:', error);
            toast.error('Lỗi khi tải ảnh lên. Vui lòng thử lại.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full">
            {value ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img src={value} alt="Thumbnail preview" className="w-full h-48 object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 p-1 bg-white/90 text-red-500 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                        title="Xóa ảnh"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                        ) : (
                            <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
                        )}
                        <p className="mb-2 text-sm text-gray-500 font-medium">
                            {isUploading ? 'Đang tải lên...' : 'Nhấn để tải ảnh Thumbnail'}
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP (Max: 5MB)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                    />
                </label>
            )}
        </div>
    );
}