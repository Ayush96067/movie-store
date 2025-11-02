"use client"; // Essential for using useState and createContext

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Creating Context object
export const MovieContext = createContext(null);

// Creating Provider component
export function MovieProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize favourites from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("favourites");
      if (raw) {
        const parsed = JSON.parse(raw);
        // normalize to strings to avoid type mismatch
        if (Array.isArray(parsed)) setFavourites(parsed.map(String));
      }
    } catch (e) {
      // ignore JSON errors
      // eslint-disable-next-line no-console
      console.error("Failed to read favourites from localStorage", e);
    }
  }, []);

  // Persist favourites to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to save favourites to localStorage", e);
    }
  }, [favourites]);

  // Add a movie id to favourites (stores ids as strings)
  const addFavourite = useCallback((movieId) => {
    if (movieId === undefined || movieId === null) return;
    const id = String(movieId);
    setIsLoading(true);
    setFavourites((prev) => {
      if (prev.includes(id)) return prev; // already present
      return [...prev, id];
    });
    setIsLoading(false);
  }, []);

  // Remove a movie id from favourites
  const removeFavourite = useCallback((movieId) => {
    if (movieId === undefined || movieId === null) return;
    const id = String(movieId);
    setIsLoading(true);
    setFavourites((prev) => prev.filter((x) => x !== id));
    setIsLoading(false);
  }, []);

  const isFavourite = useCallback(
    (movieId) => favourites.includes(String(movieId)),
    [favourites],
  );

  return (
    <MovieContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        isLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// 3. Create a custom hook for easy consumption
export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
