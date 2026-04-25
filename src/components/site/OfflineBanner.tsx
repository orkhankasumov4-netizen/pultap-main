import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-yellow-500/90 text-black px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium sticky top-0 z-[100] shadow-md backdrop-blur-sm">
      <WifiOff className="w-4 h-4" />
      <div className="flex gap-2">
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <span>⚠️ Offline rejimdəsiniz — məlumatlar son yenilənmə tarixindən göstərilir</span>
      </div>
    </div>
  );
};
