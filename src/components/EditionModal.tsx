import { Edition } from '@/types';

interface EditionModalProps {
  edition: Edition;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EditionModal({
  edition,
  onClose,
  onEdit,
  onDelete
}: EditionModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edition Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Cover Image */}
          <div className="lg:w-1/2 p-6 bg-gray-50">
            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <img
                src={edition.coverImage}
                alt={edition.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Edition Information */}
          <div className="lg:w-1/2 p-6">
            <div className="space-y-6">
              {/* Title and Category */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {edition.category}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {edition.pages} pages
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {edition.title}
                </h3>
              </div>

              {/* Date */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Publication Date</h4>
                <p className="text-lg text-gray-900">{formatDate(edition.date)}</p>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{edition.description}</p>
              </div>

              {/* Link */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Read Online</h4>
                <a
                  href={edition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <span>Open Edition</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={onEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Edition</span>
                </button>
                
                <button
                  onClick={onDelete}
                  className="px-6 py-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
