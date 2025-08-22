'use client';

import { useState, useEffect } from 'react';
import { Edition } from '@/types';
import { ApiService } from '@/services/api';
import Header from '@/components/Header';
import EditionGrid from '@/components/EditionGrid';
import EditionModal from '@/components/EditionModal';
import EditionForm from '@/components/EditionForm';
import SearchAndFilters from '@/components/SearchAndFilters';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEdition, setEditingEdition] = useState<Edition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch editions on component mount and when filters change
  useEffect(() => {
    fetchEditions();
  }, [searchQuery, selectedCategory, sortBy, sortOrder, currentPage]);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      const result = await ApiService.getEditions({
        query: searchQuery,
        category: selectedCategory,
        sortBy,
        order: sortOrder,
        page: currentPage,
        limit: 12,
      });
      setEditions(result.editions);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching editions:', error);
      toast.error('Failed to fetch editions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEdition = async (editionData: Omit<Edition, 'id'>) => {
    try {
      const newEdition = await ApiService.createEdition(editionData);
      setEditions(prev => [newEdition, ...prev]);
      setShowForm(false);
      toast.success('Edition created successfully!');
      fetchEditions(); // Refresh the list
    } catch (error) {
      console.error('Error creating edition:', error);
      toast.error('Failed to create edition');
    }
  };

  const handleUpdateEdition = async (editionData: Omit<Edition, 'id'>) => {
    if (!editingEdition) return;
    
    try {
      const updatedEdition = await ApiService.updateEdition(editingEdition.id, editionData);
      setEditions(prev => prev.map(e => e.id === editingEdition.id ? updatedEdition : e));
      setEditingEdition(null);
      toast.success('Edition updated successfully!');
      fetchEditions(); // Refresh the list
    } catch (error) {
      console.error('Error updating edition:', error);
      toast.error('Failed to update edition');
    }
  };

  const handleDeleteEdition = async (id: number) => {
    if (!confirm('Are you sure you want to delete this edition?')) return;
    
    try {
      await ApiService.deleteEdition(id);
      setEditions(prev => prev.filter(e => e.id !== id));
      toast.success('Edition deleted successfully!');
      fetchEditions(); // Refresh the list
    } catch (error) {
      console.error('Error deleting edition:', error);
      toast.error('Failed to delete edition');
    }
  };

  const handleEditClick = (edition: Edition) => {
    setEditingEdition(edition);
    setShowForm(true);
  };

  const handleViewClick = (edition: Edition) => {
    setSelectedEdition(edition);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('date');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAddClick={() => setShowForm(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
            DTU Times Digital Showcase
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Explore our collection of DTU Times editions. Each issue captures the spirit, 
            achievements, and stories that make our university community special.
          </p>
        </div>

        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onReset={resetFilters}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <EditionGrid
              editions={editions}
              onViewClick={handleViewClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteEdition}
            />
            
            {editions.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No editions found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || selectedCategory 
                    ? 'Try adjusting your search or filters'
                    : 'Be the first to add an edition!'
                  }
                </p>
                {!searchQuery && !selectedCategory && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Add First Edition
                  </button>
                )}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Edition Form Modal */}
      {showForm && (
        <EditionForm
          edition={editingEdition}
          onSubmit={editingEdition ? handleUpdateEdition : handleCreateEdition}
          onClose={() => {
            setShowForm(false);
            setEditingEdition(null);
          }}
        />
      )}

      {/* Edition View Modal */}
      {selectedEdition && (
        <EditionModal
          edition={selectedEdition}
          onClose={() => setSelectedEdition(null)}
          onEdit={() => {
            setEditingEdition(selectedEdition);
            setSelectedEdition(null);
            setShowForm(true);
          }}
          onDelete={() => {
            handleDeleteEdition(selectedEdition.id);
            setSelectedEdition(null);
          }}
        />
      )}
    </div>
  );
}
