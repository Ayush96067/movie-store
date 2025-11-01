"use client";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import Loading from "./loading";
import Image from "next/image";
const FALLBACK_IMAGE_PATH = "/src/app/public/Fallback-image.png";

function SearchQuery({ params }) {
  const [movies, setMovies] = useState([]);
  const query = params.query;
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`//www.omdbapi.com/?apikey=1596c620&s=${query}`);
      const data = await res.json();
      setMovies(data.Search);
    }
    fetchMovie();
  }, [query]);

  if (movies.length === 0)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="bg-[#121212] relative">
      {/* {movies.map((movie) => (
        <p key={movie.imdbID}>{movie.Title}</p>
      ))} */}
      <div className=" p-2 lg:p-6  place-items-center grid gap-x-3 gap-y-10 lg:gap-x-3 lg:gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieComponent key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function MovieComponent({ movie }) {
  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE_PATH;

  return (
    <div className="bg-[#1E1E1E] lg:w-96 hover:shadow-[.1px_.1px_10px_.1px_#000] text-[#dfdede]  items-center  flex flex-col gap-3 p-2 lg:p-6 box-border ">
      <div className="relative w-full h-96 overflow-hidden rounded-md">
        <Image
          src={posterSrc}
          alt={movie.Title}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 300px" // Recommended for performance
        />
      </div>
      <div className="text-center">
        <p className=" font-semibold">{movie.Title}</p>
        <p>Release Year : {movie.Year}</p>
        <button className="bg-black mt-4 text-sm flex justify-center items-center gap-1 md:gap-2 p-2 rounded-full w-full hover:bg-[#ebebeb] hover:scale-x-105 hover:text-black transition-all duration-300  text-white">
          View Details
          <span>
            <FaArrowCircleRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default SearchQuery;
