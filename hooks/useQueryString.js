"use client"

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";


const useQueryString = (query = "tab") => {
    const searchParams = useSearchParams();

    const param = searchParams.get(query);

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    return { createQueryString, param }
};

export default useQueryString;