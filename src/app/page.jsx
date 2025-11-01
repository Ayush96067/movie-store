"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SESSION_KEY = "hasVisitedHome";

function Home() {
  // Initial welcome text
  const [showIntial, setShowInitial] = useState(
    // check if user has already using website or not
    // typeof window !== "undefined" && !sessionStorage.getItem(SESSION_KEY)
    true
  );

  // Fading animation for initial text
  const [isFading, setIsFading] = useState(false);

  // Store input query
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!showIntial) {
      return; // Exit if we already know they've visited
    }

    // Store in session
    sessionStorage.setItem(SESSION_KEY, "true");

    const fadeOutTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    const timer = setTimeout(() => {
      setShowInitial(false);
    }, 1500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(timer);
    };
  });

  return (
    <div className="h-[100%]">
      {showIntial ? (
        <div className="flex bg-black  flex-col min-h-screen justify-center items-center">
          <div
            className={`transition-opacity duration-[.5s] ease-in-out p-1 text-4xl text md:text-5xl lg:text-7xl font-bold text-center ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-gray-400">
              Find Your Next Obsession <br />
              <span className="text-blue-500 text-2xl md:text-3xl">
                Reel World Awaits
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-[url('./public/bg-image.jpg')]  bg-cover bg-center min-h-screen justify-center items-center">
          <MainContent setQuery={setQuery} query={query} />
        </div>
      )}
    </div>
  );
}

function MainContent({ setQuery, query }) {
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search/${query}`);
  }
  return (
    <div className="text-center  h-full p-4  backdrop-blur-md">
      <h1 className=" font-extrabold mb-4 text-gray-400 text-4xl text md:text-5xl lg:text-7xl ">
        Let&apos;s Explore
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 md:p-4 w-full text-[#aeaeae] rounded-lg bg-[#0469bc46] focus:scale-[1.01] transition-all duration-100 ease-in-out border-none ring-0 focus:outline-none focus:shadow-[.5px_0.5px_10px_0.5px_#028dff]"
        />
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
