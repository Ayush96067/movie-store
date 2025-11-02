"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error }) {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-[1.8rem]">{error}</h2>
    </div>
  );
}
