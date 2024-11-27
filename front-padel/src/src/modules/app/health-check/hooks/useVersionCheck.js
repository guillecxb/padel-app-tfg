import { useState, useEffect } from "react";

import axios from "axios";

const useVersionCheck = () => {
  const [actualVersion, setActualVersion] = useState();
  const [isVersionUpdated, setIsVersionUpdated] = useState(true);

  useEffect(() => {
    const checkAppVersion = async () => {
      const {
        data: { version },
      } = await axios.get("/config.json");
      if (!actualVersion) {
        setActualVersion(version);
      } else if (actualVersion !== version) {
        setActualVersion(version);
        setIsVersionUpdated(false);
      }
    };

    setInterval(checkAppVersion, 30000);

    return () => {
      clearInterval(checkAppVersion);
    };
  }, [actualVersion]);

  return { isVersionUpdated };
};

export default useVersionCheck;
