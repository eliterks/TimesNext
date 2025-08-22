interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DTU Times</h1>
              <p className="text-sm text-gray-600">Digital Magazine Showcase</p>
            </div>
          </div>
          
          <button
            onClick={onAddClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Edition</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
