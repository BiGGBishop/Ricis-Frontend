"use client";

import { useState, useEffect } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(false); // Default to offline state initially

  useEffect(() => {
    // Check if navigator is available (running in browser environment)
    if (typeof window !== "undefined" && window.navigator) {
      setIsOnline(window.navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
      };

      const handleOffline = () => {
        setIsOnline(false);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return isOnline;
};

export default useNetworkStatus;
