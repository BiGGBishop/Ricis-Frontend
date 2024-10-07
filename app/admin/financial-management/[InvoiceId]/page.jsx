"use client";

import Invoice from "@/components/Invoice";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { useParams } from "next/navigation";
import ApprovalFlow from "./ApprovalFlow";

const TransactionInvoice = () => {
  const params = useParams();
  const InvoiceId = params.InvoiceId;
  return (
    <DashboardLayout header={`Invoice #${InvoiceId}`}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-lg">Account Invoices</h1>
        <p className="text-gray-600 text-sm">view all account purchase below</p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <Invoice />
        <ApprovalFlow />
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(TransactionInvoice);
