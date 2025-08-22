import { useState, useEffect } from 'react';
import { Edition, EditionFormData } from '@/types';

interface EditionFormProps {
  edition?: Edition | null;
  onSubmit: (data: Omit<Edition, 'id'>) => void;
  onClose: () => void;
}

export default function EditionForm({ edition, onSubmit, onClose }: EditionFormProps) {
  const [formData, setFormData] = useState<EditionFormData>({
    title: '',
    date: '',
    description: '',
    coverImage: '',
    link: '',
    category: '',
    pages: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (edition) {
      setFormData({
        title: edition.title,
        date: edition.date,
        description: edition.description,
        coverImage: edition.coverImage,
        link: edition.link,
        category: edition.category,
        pages: edition.pages
      });
    }
  }, [edition]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
    }
    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.pages || formData.pages <= 0) {
      newErrors.pages = 'Pages must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof EditionFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const categories = ['Monthly', 'Special', 'Annual', 'Event'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {edition ? 'Edit Edition' : 'Add New Edition'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter edition title..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Date and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Publication Date *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.date ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Pages and Cover Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages *
              </label>
              <input
                type="number"
                id="pages"
                value={formData.pages}
                onChange={(e) => handleInputChange('pages', parseInt(e.target.value) || 0)}
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.pages ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter number of pages"
              />
              {errors.pages && (
                <p className="mt-1 text-sm text-red-600">{errors.pages}</p>
              )}
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL *
              </label>
              <input
                type="url"
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.coverImage ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
              )}
            </div>
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
              Edition Link *
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.link ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="https://example.com/edition"
            />
            {errors.link && (
              <p className="mt-1 text-sm text-red-600">{errors.link}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter edition description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {edition ? 'Update Edition' : 'Create Edition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
