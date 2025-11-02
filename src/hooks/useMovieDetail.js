"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_OMDB_URL;
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

const useMovieDetail = (imdbId) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}`);

        if (!res.ok) throw new Error("Error fetching Movie");

        const data = await res.json();
        setMovie(data);
      } catch (error) {}
    }
    fetchMovie();
  }, [imdbId]);

  return { movie };
};

export default useMovieDetail;
