import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
    const [invoice, customers] = await Promise.all([fetchInvoiceById(params.id), fetchCustomers()])

    if (!invoice) {
        notFound()
    }

    return (<EditInvoiceForm invoice={invoice || {}} customers={customers} />)
}