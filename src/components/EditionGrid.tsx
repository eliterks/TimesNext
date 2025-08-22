import { Edition } from '@/types';

interface EditionGridProps {
  editions: Edition[];
  onViewClick: (edition: Edition) => void;
  onEditClick: (edition: Edition) => void;
  onDeleteClick: (id: number) => void;
}

export default function EditionGrid({
  editions,
  onViewClick,
  onEditClick,
  onDeleteClick
}: EditionGridProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {editions.map((edition) => (
        <div
          key={edition.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
        >
          {/* Cover Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={edition.coverImage}
              alt={edition.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewClick(edition)}
                  className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors duration-200 transform hover:scale-110"
                  title="View Details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => onEditClick(edition)}
                  className="bg-blue-500/90 hover:bg-blue-500 text-white p-2 rounded-full transition-colors duration-200 transform hover:scale-110"
                  title="Edit Edition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteClick(edition.id)}
                  className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full transition-colors duration-200 transform hover:scale-110"
                  title="Delete Edition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Edition Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {edition.category}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {edition.pages} pages
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
              {edition.title}
            </h3>
            
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {edition.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                {formatDate(edition.date)}
              </span>
              
              <a
                href={edition.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors flex items-center space-x-1"
              >
                <span>Read</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
