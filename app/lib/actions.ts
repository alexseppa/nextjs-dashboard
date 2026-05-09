'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
});

export async function createInvoice(formData: FormData) {
  const customerId = formData.get('customerId') as string;
  const rawAmount = formData.get('amount') as string;
  const status = formData.get('status') as string;

  const amount = Math.round(Number(rawAmount) * 100);
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}