import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { pgTable, serial, text, varchar , integer } from "drizzle-orm/pg-core";

export const cartTable = pgTable('cart', {
  product_id: varchar('product_id').notNull(),
  product_title: varchar('product_title'),
  product_price: integer("product_price"),
  product_quantity: integer("product_quantity").notNull(),
  sub_category: varchar('sub_category'),
  image: varchar('image')
  }); 

export const db = drizzle(sql)
