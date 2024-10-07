import { useState } from "react";
import { FilterIcon, SearchIcon } from "@/svgs";
import FilterOptionsModal from "../modals/filterOptionsModal";
import { useSelector } from "react-redux";
import {
  selectApplications,
  selectFetchingStates,
} from "@/store/features/applicatonsSlice";


const Search = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const applications = useSelector(selectApplications);
  const fetchingStates = useSelector(selectFetchingStates);
  console.log(applications);
  console.log(fetchingStates);

  return (
    <>
      {openFilter && <FilterOptionsModal setOpenFilter={setOpenFilter} />}
      <div className="space-y-3">
        {/* <form className="flex items-center gap-2 w-full">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <span>{SearchIcon}</span>
            </div>
            <input
              type="search"
              id="search"
              className="rounded-2xl text-gray-700 bg-gray-100 block w-full p-3 ps-10 text-sm text-white-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Search"
              required
            />
          </div>
          <button type="button" className="bg-blue-800 text-sm font-medium px-6 py-2 text-white shadow-md rounded-md hover:bg-blue-950">
            Search
          </button>
        </form> */}
        <div className="text-sm flex items-center gap-4">
          <button
            onClick={() => setOpenFilter(true)}
            className="flex items-center gap-2 bg-blue-800 font-medium lg:px-6 px-3 py-2.5 text-white shadow-md rounded-md hover:bg-blue-950 transform active:scale-75 transition-transform"
          >
            <span>{FilterIcon}</span>
            <span className="">Select filters</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
