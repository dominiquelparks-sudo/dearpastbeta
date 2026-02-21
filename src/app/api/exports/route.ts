import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';
import PDFDocument from 'pdfkit';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const exportSchema = z.object({
  projectId: z.number(),
  userId: z.number(),
  format: z.enum(['PDF']),
  size: z.enum(['US Letter', 'A4']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, userId, format, size } = exportSchema.parse(body);

    const exportRecord = await prisma.export.create({
      data: {
        userId,
      },
    });

    const doc = new PDFDocument();
    let pdfBuffer = Buffer.alloc(0);

    doc.on('data', (chunk: Buffer) => {
      pdfBuffer = Buffer.concat([pdfBuffer, chunk]);
    });

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { contentItems: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    doc.fontSize(25).text(project.title, 100, 100);
    doc.fontSize(12).text(project.description || '', 100, 150);
    doc.addPage();

    project.contentItems.forEach((item) => {
      doc.fontSize(14).text(item.title);
      doc.fontSize(10).text(item.content);
      doc.moveDown();
    });

    doc.end();
    await new Promise((resolve) => doc.on('finish', resolve));

    const filename = `exports/${userId}/${projectId}-${Date.now()}.pdf`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: filename,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
    });

    await s3Client.send(command);

    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`;

    return NextResponse.json({ exportId: exportRecord.id, fileUrl, status: 'ready', });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to create export' }, { status: 500 });
  }
}