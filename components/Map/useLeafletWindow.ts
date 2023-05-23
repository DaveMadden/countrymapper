// "use client";
// import { useEffect, useState } from "react";

// const useLeafletWindow = () => {
//   const [leafletWindow, setLeafletWindow] = useState(
//     typeof window === "undefined" ? undefined : window.L
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (window.L) {
//         setLeafletWindow(window.L);
//         clearInterval(interval);
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);

//   return leafletWindow;
// };

// export default useLeafletWindow;
"use client";
import { useEffect, useState } from "react";

const useLeafletWindow = () => {
  const [leafletWindow, setLeafletWindow] = useState(
    typeof window !== "undefined" ? window.L : undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        if (window.L) {
          setLeafletWindow(window.L);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  return leafletWindow;
};

export default useLeafletWindow;
