"use client"

import { ArrowLeft } from "@/svgs";
import { useRouter } from "next/navigation";
import Table from "./Table";
import { useState } from "react";
import { getToken } from "@/utils/authHelpers";
import { baseUrl } from "@/lib/configs";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Search = () => {

    const router = useRouter();

    const [items, setItems] = useState([]);
    const [refNo, setRefNo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const token = getToken();

    const getResult = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("")

        try {
            const res = await axios({
                method: "GET",
                url: `${baseUrl}/certificates/search-by-ref?ref=${refNo}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            setItems(res.data.data.certificates)
        } catch (error) {
            console.log(error)
            setError(error.response.data.error)
        } finally {
            setIsLoading(false);
        }
    };

    console.log(items)

    return (
        <div className="w-full pb-8">
            <div
                className="mt-8 ml-8 w-[2.5rem] h-[2.5rem] flex items-center justify-center cursor-pointer hover:opacity-70 p-2 rounded-full border-gray-400 border-2 border-dashed"
                onClick={() => router.back()}>
                {ArrowLeft}
            </div>
            <div className="w-[90%] mx-auto pt-8">
                <h1 className="text-black font-bold text-2xl">SEARCH</h1>
                <p className="text-gray-600 text-sm">
                    Search Certificate And Qualification Holders
                </p>
            </div>
            <form className="bg-white p-8 mx-auto w-[90%] rounded-md shadow-md mt-12" action="">
                <div className="w-full lg:w-[80%] lg:mx-auto">
                    {/* <div className="flex space-y-4 flex-col w-[90%]">
                        <label className="font-bold" htmlFor="lastName">Last Name:</label>
                        <input className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none" placeholder="Enter Last Name" type="text" />
                    </div> */}
                    {/* <div className="flex justify-center items-center space-x-4 my-8 w-[90%]">
                        <div className="border-t border-gray-300 flex-grow" />
                        <p className="text-gray-500 font-semibold">Or</p>
                        <div className="border-t border-gray-300 flex-grow" />
                    </div> */}
                    <div className="mb-4 flex flex-col space-y-4 w-full lg:w-[90%]">
                        <label className="font-bold" htmlFor="lastName">Certificate Number:</label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                            placeholder="Enter Certificate Number"
                            type="text"
                            value={refNo}
                            onChange={(e) => setRefNo(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-600 text-white rounded-md px-12 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                        type="submit"
                        onClick={getResult}
                    >
                        {isLoading ?
                            <div className="flex gap-x-2 items-center">
                                <ClipLoader color="white" size={15} />
                                <p className="text-white">Searching...</p>
                            </div>
                            :
                            "Search"
                        }
                    </button>
                </div>
            </form>
            {error &&
                <div className="w-full space-y-8 mt-28 pb-12">
                    <img className="mx-auto w-36 h-36" src="/images/Group.svg" alt="" />
                    <h1 className="text-slate-300 text-xl text-center">No record found on system</h1>
                </div>
            }
            {(items?.length !== 0 && !error) &&
                <div className="w-[90%] mx-auto font-bold text-md text-center pt-8">
                    <p className="">Result for Certification Number: {items[0]?.ref_no}</p>
                    <div className="bg-white p-6 mt-12 w-full mx-auto rounded-md shadow-md">
                        <Table items={items} />
                    </div>
                </div>
            }
        </div>
    )
};

export default Search;