"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/authHelpers";

const WithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
      const checkToken = async () => {
        const token = getToken(); 

        if (!token) {
          router.replace("/");
        } else {
          setHasToken(true);
        }
        setIsTokenChecked(true);
      };

      checkToken();
    }, []);

    if (!isTokenChecked) {
      // You can also return a loading state or another component here
      return null;
    }

    if (!hasToken) {
      return null; // Or you can render a message or component indicating the user is not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;
