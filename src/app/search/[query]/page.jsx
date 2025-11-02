"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import Loading from "./loading";
import Image from "next/image";
import Error from "./error";
const FALLBACK_IMAGE_PATH = "/src/app/public/Fallback-image.png";

function SearchQuery({ params }) {
  // Store array of movies comming from omdb database for requested query
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const totalPages = totalResults !== 0 ? Math.floor(totalResults / 10) + 1 : 1;

  // getting query from params
  const query = params.query;

  // Fetching movies
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    async function fetchMovie() {
      try {
        const res = await fetch(
          `//www.omdbapi.com/?apikey=1596c620&s=${query}&page=${page}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        if (data.Response === "False") {
          setMovies([]);
          setNoResults(true);
          setTotalResults(0);
        } else if (data.Search) {
          setMovies(data.Search);
          if (page == 1) setTotalResults(data.totalResults);
        } else {
          // Handle unexpected success (like a non-array response)
          setHasError(true);
        }

        setMovies(data.Search);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchMovie();
  }, [query, page]);

  // console.log(totalResults);
  // console.log("Total query", page * 10);
  // console.log("Total Pages", totalPages);

  if (noResults)
    return <Error error={"No results found or Too much Results"} />;

  if (hasError) return <Error error={"Failed to fetch"} />;

  // Pagination
  function handlePrev() {
    setPage((page) => (page === 1 ? page : page - 1));
  }
  function handleNext() {
    setPage((page) => (page < totalPages ? page + 1 : page));
  }

  // Loggin movies
  // console.log(movies.filter((curr,i,arr)=>curr.id === arr.find()));

  return (
    <div className="bg-[#121212] relative">
      <div className=" p-2 lg:p-6  place-items-center grid gap-x-3 gap-y-10 lg:gap-x-3 lg:gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Mapping each individual movie from movies array */}
        {movies.map((movie) => (
          <MovieComponent key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center text-2xl p-4 gap-2">
        <button
          onClick={handlePrev}
          className={`${
            page === 1 ? "hidden" : "visible"
          } hover:bg-white hover:text-black rounded-full`}
        >
          <MdKeyboardArrowLeft className="" />
        </button>
        <p>
          {page}...{totalPages}
        </p>
        <button
          onClick={handleNext}
          className={` ${
            page === totalPages ? "hidden" : "visible"
          }  hover:bg-white hover:text-black rounded-full `}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}

function MovieComponent({ movie }) {
  // if movie poster is Not Available
  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE_PATH;

  return (
    <div className="bg-[#1E1E1E] lg:w-96 hover:shadow-[.1px_.1px_10px_.1px_#000] text-[#dfdede]  items-center  flex flex-col gap-3 p-2 lg:p-6 box-border ">
      <div className="relative w-full h-96 overflow-hidden rounded-md">
        <Image
          src={posterSrc}
          alt={`${movie.Title} poster not loading`}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 300px"
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
