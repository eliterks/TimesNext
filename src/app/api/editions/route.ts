import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Edition, EditionFormData, ApiResponse } from '@/types';

const dbPath = path.join(process.cwd(), 'db.json');

// Helper function to read database
async function readDatabase(): Promise<{ editions: Edition[] }> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { editions: [] };
  }
}

// Helper function to write database
async function writeDatabase(data: { editions: Edition[] }): Promise<void> {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw new Error('Failed to write to database');
  }
}

// GET /api/editions - Fetch all editions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'date';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const db = await readDatabase();
    let editions = [...db.editions];

    // Search functionality
    if (query) {
      editions = editions.filter(edition =>
        edition.title.toLowerCase().includes(query.toLowerCase()) ||
        edition.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      editions = editions.filter(edition => edition.category === category);
    }

    // Sorting
    editions.sort((a, b) => {
      let aValue: string | number | Date = a[sortBy as keyof Edition];
      let bValue: string | number | Date = b[sortBy as keyof Edition];

      if (sortBy === 'date') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEditions = editions.slice(startIndex, endIndex);

    const response: ApiResponse<{
      editions: Edition[];
      total: number;
      page: number;
      totalPages: number;
    }> = {
      success: true,
      data: {
        editions: paginatedEditions,
        total: editions.length,
        page,
        totalPages: Math.ceil(editions.length / limit)
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching editions:', error);
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch editions'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// POST /api/editions - Create a new edition
export async function POST(request: NextRequest) {
  try {
    const body: EditionFormData = await request.json();

    // Basic validation
    if (!body.title || !body.date || !body.description || !body.coverImage || !body.link || !body.category || !body.pages) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'All fields are required'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const db = await readDatabase();
    
    // Generate new ID
    const newId = Math.max(...db.editions.map(e => e.id), 0) + 1;
    
    const newEdition: Edition = {
      id: newId,
      ...body
    };

    db.editions.push(newEdition);
    await writeDatabase(db);

    const response: ApiResponse<Edition> = {
      success: true,
      data: newEdition,
      message: 'Edition created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating edition:', error);
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to create edition'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
