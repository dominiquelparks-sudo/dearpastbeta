import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';

const contentItemSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  userId: z.number(),
  projectId: z.number(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }
    const contentItems = await prisma.contentItem.findMany({
      where: { projectId: parseInt(projectId) },
    });
    return NextResponse.json({ contentItems });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, userId, projectId } = contentItemSchema.parse(body);
    const contentItem = await prisma.contentItem.create({
      data: { title, content, userId, projectId },
    });
    return NextResponse.json({ contentItem }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create content item' }, { status: 500 });
  }
}