import { useState, useEffect } from "react";

const useOnlineCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const setOnline = () => {
    setIsOnline(true);
  };
  const setOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return { isOnline };
};

export default useOnlineCheck;
