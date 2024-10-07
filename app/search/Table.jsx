"use client"

import { time } from "@/utils/time&dates";

const tableColumn = ["Certificate No.", "Applicant Name", "Type", "Category", "Validity", "Status"];


const Table = ({ items }) => {

    return (
        <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg text-xs">
            <table className="w-full text-left rtl:text-right">
                <thead className={` bg-dark-gray text-gray-400 py-4 bg-gray-100`}>
                    <tr className="whitespace-nowrap">
                        {tableColumn.map((data, index) => (
                            <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                                {data}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {items?.map((data, index) => {
                        return (
                            <tr
                                key={data.id}
                                className="whitespace-nowrap border-b-[1px] border-b-gray-300 border-b-solid cursor-pointer hover:opacity-70" >
                                <td className={`px-6 py-4  `}>{data.ref_no}</td>
                                <td className={`px-6 py-4  `}>{data.user.fullName}</td>
                                <td className={`px-6 py-4`}>{data.applicationData.application_name}</td>
                                <td className={`px-6 py-4`}>{data.applicationData.form_category}</td>
                                <td className={`px-6 py-4`}>{time.formatDate(data.expiry_date)}</td>
                                <td className={`whitespace-nowrap text-white`}>
                                    <div className={`px-2 w-fit py-1 ${data.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"} rounded-md`}>
                                        {data.status}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
};

export default Table;