import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const contentUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const contentItem = await prisma.contentItem.findUnique({ where: { id }, });

    if (!contentItem) {
      return NextResponse.json({ error: 'Content item not found' }, { status: 404 });
    }

    return NextResponse.json({ contentItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { title, content } = contentUpdateSchema.parse(body);

    const contentItem = await prisma.contentItem.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return NextResponse.json({ contentItem });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update content item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.contentItem.delete({ where: { id }, });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete content item' }, { status: 500 });
  }
}