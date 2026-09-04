"use client";

import { useEffect } from "react";
import { ErrorScreen } from "@/components/site/error-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is what correlates this screen with the server log entry.
    console.error(error);
  }, [error]);

  return <ErrorScreen reset={reset} home="/" homeLabel="Back to the Institute" />;
}
