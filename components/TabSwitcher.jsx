import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/helpers";

const TabSwitcher = ({ applicationsTabs }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get("tab");

  return (
    <div className="space-x-3 bg-white rounded-md p-4 text-center lg:text-start shadow-sm text-sm">
      {applicationsTabs.map((tab, index) => (
        <Link
          key={tab.id}
          href={{ pathname: pathname, query: { tab: tab.tab } }}
          className={`${
            (!param && index === 0) || param === tab.tab
              ? "text-blue-700 font-bold"
              : "text-gray-400"
          } `}
        >
          {capitalizeFirstLetter(tab.tab)}
        </Link>
      ))}
    </div>
  );
};

export default TabSwitcher;
