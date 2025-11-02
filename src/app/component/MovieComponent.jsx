"use client";

import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import AddRemoveFav from "./AddRemoveFav";

const FALLBACK_IMAGE_PATH = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_PATH;

// Component to render individual movie card
export default function MovieComponent({ movie }) {
  const router = useRouter();

  // Use fallback image if movie poster is not available
  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE_PATH;

  function onHandleClick() {
    router.push(`/movie/${movie.imdbID}`);
  }

  return (
    // Movie card container with hover effects
    <div className="box-border flex flex-col items-center gap-3 bg-[#1E1E1E] p-2 text-[#dfdede] hover:shadow-[.1px_.1px_10px_.1px_#000] lg:w-96 lg:p-6">
      {/* Movie poster container with responsive image */}
      <div className="relative h-96 w-full overflow-hidden rounded-md">
        <Image
          src={posterSrc}
          alt={`${movie.Title} poster not loading`}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 300px"
        />
      </div>
      {/* Movie details section */}
      <div className="flex flex-col gap-3 text-center">
        <p className="font-semibold">{movie.Title}</p>
        <p>Release Year : {movie.Year}</p>
        <Button
          text={"View Details"}
          classAdd={"w-full"}
          onHandleClick={onHandleClick}
        />
      </div>
      <AddRemoveFav movieID={movie.imdbID} />
    </div>
  );
}
