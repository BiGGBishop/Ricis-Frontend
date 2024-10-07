import { SortIcon } from "@/svgs";

const TableSkeleton = () => {
  return (
    <div className="relative overflow-x-auto lg:overflow-x-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-sm text-gray-500 uppercas bg-gray-50">
          <tr className="whitespace-nowrap">
            {[1, 2, 3, 4].map((loader) => (
              <th key={loader} scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  <span className="w-24 h-3 bg-gray-200 animate-pulse"></span>
                  <a href="#">{SortIcon}</a>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((loader) => (
            <tr key={loader} className="whitespace-nowarap">
              <td className="bg-gray-200 h-16 border-b border-gray-300 w-full animate-pulse"></td>
              <td className="bg-gray-200 h-16 border-b border-gray-300 w-full animate-pulse"></td>
              <td className="bg-gray-200 h-16 border-b border-gray-300 w-full animate-pulse"></td>
              <td className="bg-gray-200 h-16 border-b border-gray-300 w-full animate-pulse"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
