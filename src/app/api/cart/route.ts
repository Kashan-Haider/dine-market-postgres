import { NextRequest, NextResponse } from 'next/server';
import { db, cartTable } from '@/lib/drizzle';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';

interface ProductInterface {
  product_title: string;
  product_price: number;
  product_id: string;
  sub_category: string;
  product_quantity: number;
  image: string
}

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cart(
        product_id VARCHAR NOT NULL,
        product_title VARCHAR,
        product_price INTEGER,
        product_quantity INTEGER NOT NULL,
        sub_category VARCHAR,
        image VARCHAR
      );
    `;
    const res = await db.select().from(cartTable);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: (err as { message: string }).message });
  }
}

export async function POST(request: NextRequest) {
  const req: ProductInterface = await request.json();
  const res = await db.select().from(cartTable);
  const index = res.findIndex((item) => item.product_id === req.product_id);
  if (index !== -1) {
    const quantity = res[index].product_quantity + req.product_quantity;
    try {
      await db
        .update(cartTable)
        .set({ product_quantity: quantity })
        .where(eq(cartTable.product_id, req.product_id))
        .execute();
    } catch (error) {
      return NextResponse.json({
        error: (error as { message: string }).message,
      });
    }
  } else {
    try {
      await db
        .insert(cartTable)
        .values({
          product_id: req.product_id,
          product_quantity: req.product_quantity,
          product_title: req.product_title,
          product_price: req.product_price,
          sub_category: req.sub_category,
          image: req.image,
        })
        .execute();
    } catch (err) {
      return NextResponse.json({
        error: (err as { message: string }).message,
      });
    }
  }
  return new NextResponse('success');
}

export async function DELETE(request: NextRequest) {
  const req = request.nextUrl;
  const id: string = req.searchParams.get("product_id") ||""
  try {
      await db
      .delete(cartTable)
      .where(eq(cartTable.product_id, id))
      return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    return NextResponse.json({
      error: (err as {message: string}).message
    });
  }
}

