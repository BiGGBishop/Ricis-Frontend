"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithAuth from "@/components/withAuth";
import { useParams } from "next/navigation";

const ManageClassification = () => {
  const params = useParams();
  const classificationId = params.classificationId;
  return (
    <DashboardLayout header={`Classification #${classificationId}`}>
      <div className="w-full pb-8">
        <h1 className="text-black font-bold text-lg">Manage Classification</h1>
        <p className="text-gray-600 text-sm">Update classification below</p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        
      </div>
    </DashboardLayout>
  );
};

export default WithAuth(ManageClassification);
