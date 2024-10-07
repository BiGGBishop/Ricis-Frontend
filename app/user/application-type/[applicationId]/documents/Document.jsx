"use client";

import { Cancel, document } from "@/svgs";
import { truncateWithEllipsisAndExtension } from "@/utils/helpers";
import Link from "next/link";

const Document = ({ name, removeDocument }) => {
  const isDocUrl = name?.includes("http");
  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-md px-2 py-1 w-full">
      <div className="flex items-center gap-2">
        <span className="">{document}</span>
        {isDocUrl ? (
          <Link href={name}>{truncateWithEllipsisAndExtension(name, 30)}</Link>
        ) : (
          <span className="text-gray-500 text-sm">{name}</span>
        )}
      </div>
      {!isDocUrl && (
        <span className="cursor-pointer" onClick={removeDocument}>
          {Cancel}
        </span>
      )}
    </div>
  );
};

export default Document;
