"use client";

import MainContent from "@/app/component/MainContent";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Home() {
  const router = useRouter();
  // Store input query
  const [query, setQuery] = useState("");

  return (
    <div className="h-[100%]">
      <div className="flex min-h-screen flex-col items-center justify-center bg-[url('./public/bg-image.jpg')] bg-cover bg-center">
        <button onClick={() => router.push("/favourites")}>Fav</button>
        <MainContent setQuery={setQuery} query={query} />
      </div>
    </div>
  );
}

export default Home;
