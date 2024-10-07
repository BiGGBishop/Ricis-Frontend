"use client";

import { document } from "@/svgs";
import { truncateWithEllipsisAndExtension } from "@/utils/helpers";
import Link from "next/link";

const Document = ({ documentName }) => {
  const isDocUrl = documentName?.includes("http");
  return (
    <div className="flex items-center gap-2">
      <span className="">{document}</span>
      {isDocUrl ? (
        <Link href={documentName}>
          {truncateWithEllipsisAndExtension(documentName, 35)}
        </Link>
      ) : (
        <span className="text-gray-400 text-sm">
          {truncateWithEllipsisAndExtension(documentName, 35)}
        </span>
      )}
    </div>
  );
};

export default Document;
