import { Edition, EditionFormData, ApiResponse } from '@/types';

const API_BASE_URL = '/api';

export class ApiService {
  // Fetch all editions with optional filters
  static async getEditions(params: {
    query?: string;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  } = {}): Promise<{
    editions: Edition[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('q', params.query);
    if (params.category) searchParams.append('category', params.category);
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.order) searchParams.append('order', params.order);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/editions?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch editions');
    }

    const data: ApiResponse<{
      editions: Edition[];
      total: number;
      page: number;
      totalPages: number;
    }> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch editions');
    }

    return data.data;
  }

  // Fetch a specific edition by ID
  static async getEdition(id: number): Promise<Edition> {
    const response = await fetch(`${API_BASE_URL}/editions/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch edition');
    }

    const data: ApiResponse<Edition> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch edition');
    }

    return data.data;
  }

  // Create a new edition
  static async createEdition(editionData: EditionFormData): Promise<Edition> {
    const response = await fetch(`${API_BASE_URL}/editions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editionData),
    });

    if (!response.ok) {
      throw new Error('Failed to create edition');
    }

    const data: ApiResponse<Edition> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to create edition');
    }

    return data.data;
  }

  // Update an existing edition
  static async updateEdition(id: number, editionData: EditionFormData): Promise<Edition> {
    const response = await fetch(`${API_BASE_URL}/editions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editionData),
    });

    if (!response.ok) {
      throw new Error('Failed to update edition');
    }

    const data: ApiResponse<Edition> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to update edition');
    }

    return data.data;
  }

  // Delete an edition
  static async deleteEdition(id: number): Promise<Edition> {
    const response = await fetch(`${API_BASE_URL}/editions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete edition');
    }

    const data: ApiResponse<Edition> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to delete edition');
    }

    return data.data;
  }
}
