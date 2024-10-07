import DashboardLayout from "@/components/layouts/DashboardLayout";
import Table from "./Table";

const Certification = () => {
    return (
        <DashboardLayout header="Certification" isSidebarLink={true}>
            <div className="w-full pb-8">
                <h1 className="text-black font-bold">CERTIFICATIONS</h1>
                <p className="text-gray-600 text-sm">
                    view all your certifications below
                </p>
            </div>
            <div className="bg-white p-6 space-y-4">
                <Table />
            </div>
        </DashboardLayout>
    )
};

export default Certification;