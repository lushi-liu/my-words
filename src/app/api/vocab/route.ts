import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Vocabulary from '@/src/models/Vocabulary';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { english, japanese, notes, category } = body;

    if (!english || !japanese) {
      return NextResponse.json(
        { error: 'English and Japanese fields are required' },
        { status: 400 }
      );
    }

    const newEntry = await Vocabulary.create({
      english,
      japanese,
      notes: notes || '',
      category: category || 'other',
    });

    return NextResponse.json(
      { success: true, data: newEntry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving vocab:', error);
    return NextResponse.json(
      { error: 'Failed to save vocabulary', details: error.message },
      { status: 500 }
    );
  }
}

// Optional: GET all entries (for a vocab list page)
export async function GET() {
  try {
    await dbConnect();
    const entries = await Vocabulary.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vocab' },
      { status: 500 }
    );
  }
}
