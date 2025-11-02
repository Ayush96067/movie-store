import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainContent({ setQuery, query }) {
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
    <div className="h-full p-4 text-center backdrop-blur-md">
      <h1 className="text mb-4 text-4xl font-extrabold text-gray-400 md:text-5xl lg:text-7xl">
        Let&apos;s Explore
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border-none bg-[#0469bc46] p-2 text-[#aeaeae] ring-0 transition-all duration-100 ease-in-out focus:scale-[1.01] focus:shadow-[.5px_0.5px_10px_0.5px_#028dff] focus:outline-none md:p-4"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-2 bg-black p-3 text-white hover:bg-[#1e1e1ef7] md:text-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
}
