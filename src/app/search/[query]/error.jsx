"use client";

import { Error as ErrorComponent } from "@/app/component/Error";

// Error components must be Client Components
export default function Error({ error }) {
  return <ErrorComponent error={"Something went wrong"} />;
}
