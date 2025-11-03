"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

// Configure NProgress
NProgress.configure({ showSpinner: false });

export function useLoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show progress bar
    NProgress.start();

    // Hide progress bar after a short delay to ensure it's visible
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);
}
