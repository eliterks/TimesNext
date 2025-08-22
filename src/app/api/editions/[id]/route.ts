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

// GET /api/editions/[id] - Fetch a specific edition
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const editionId = parseInt(id);
    if (isNaN(editionId)) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Invalid edition ID'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const db = await readDatabase();
    const edition = db.editions.find(e => e.id === editionId);

    if (!edition) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Edition not found'
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const response: ApiResponse<Edition> = {
      success: true,
      data: edition
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching edition:', error);
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch edition'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// PUT /api/editions/[id] - Update an edition
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const editionId = parseInt(id);
    if (isNaN(editionId)) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Invalid edition ID'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

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
    const editionIndex = db.editions.findIndex(e => e.id === editionId);

    if (editionIndex === -1) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Edition not found'
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const updatedEdition: Edition = {
      id: editionId,
      ...body
    };

    db.editions[editionIndex] = updatedEdition;
    await writeDatabase(db);

    const response: ApiResponse<Edition> = {
      success: true,
      data: updatedEdition,
      message: 'Edition updated successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating edition:', error);
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to update edition'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// DELETE /api/editions/[id] - Delete an edition
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const editionId = parseInt(id);
    if (isNaN(editionId)) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Invalid edition ID'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const db = await readDatabase();
    const editionIndex = db.editions.findIndex(e => e.id === editionId);

    if (editionIndex === -1) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        error: 'Edition not found'
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const deletedEdition = db.editions[editionIndex];
    db.editions.splice(editionIndex, 1);
    await writeDatabase(db);

    const response: ApiResponse<Edition> = {
      success: true,
      data: deletedEdition,
      message: 'Edition deleted successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting edition:', error);
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete edition'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
