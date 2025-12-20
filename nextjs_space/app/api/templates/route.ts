import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request?.nextUrl?.searchParams;
    const bhkType = searchParams?.get('bhkType');

    let templates;
    
    if (bhkType) {
      templates = await prisma?.template?.findMany?.({
        where: {
          bhkType: bhkType
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } else {
      templates = await prisma?.template?.findMany?.({
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    return NextResponse.json(templates ?? []);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
