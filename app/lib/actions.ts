'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.'
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status'
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
    const formParsedResult = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!formParsedResult.success) {
        return {
            errors: formParsedResult.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice'
        }
    }
    const { customerId, amount, status } = formParsedResult.data

    const amountInCents = amount * 100;

    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Faled to create invoice'
        }
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

const EditFormSchema = FormSchema.omit({ id: true, date: true })

export async function editInvoice(prevState: State, formData: FormData) {
    const editFormParsedResult = EditFormSchema.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    if (!editFormParsedResult.success) {
        return {
            errors: editFormParsedResult.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice'
        }
    }
        const { customerId, amount, status } = editFormParsedResult.data;
        const amountInCents = amount * 100
        try {

            await sql`
            UPDATE invoices
            SET amount=${amountInCents}, status=${status}
            WHERE customer_id=${customerId}
            `
        } catch (error) {
            return {
                message: 'Database Error: Faled to delete update'
            }
        }

        revalidatePath('/dashboard/invoices');

        redirect('/dashboard/invoices');
    
}

const numberSchema = z.string()
export async function deleteInvoice(id: string) {
    const idParsed = numberSchema.parse(id);
    try {
        await sql`
        DELETE FROM invoices
        WHERE id=${idParsed}`

    } catch (error) {
        return {
            error: 'Database Error: Faled to delete invoice'
        }
    }

    revalidatePath('/dashboard/invoices');

}


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }