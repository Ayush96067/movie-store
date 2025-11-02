"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SESSION_KEY = "hasVisitedHome";

function Home() {
  // Store input query
  const [query, setQuery] = useState("");

  return (
    <div className="h-[100%]">
      <div className="flex flex-col bg-[url('./public/bg-image.jpg')]  bg-cover bg-center min-h-screen justify-center items-center">
        <MainContent setQuery={setQuery} query={query} />
      </div>
    </div>
  );
}

function MainContent({ setQuery, query }) {
  const router = useRouter();
  const [error, setError] = useState("");

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (query.length < 1) {
      setError("Please enter name of a movie");
      return;
    }
    router.push(`/search/${query}`);
  }
  return (
    <div className="text-center  h-full p-4  backdrop-blur-md">
      <h1 className=" font-extrabold mb-4 text-gray-400 text-4xl text md:text-5xl lg:text-7xl ">
        Let&apos;s Explore
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 md:p-4 w-full text-[#aeaeae] rounded-lg bg-[#0469bc46] focus:scale-[1.01] transition-all duration-100 ease-in-out border-none ring-0 focus:outline-none focus:shadow-[.5px_0.5px_10px_0.5px_#028dff]"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="text-white mt-2 hover:bg-[#1e1e1ef7] p-3 bg-black md:text-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;
