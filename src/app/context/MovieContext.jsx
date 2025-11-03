"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Create a Context object
export const MovieContext = createContext(null);

// Provider Component
export function MovieProvider({ children }) {
  // Store favourites in state and Read initially from localStorage (avoid overwritting localStorage on initial mount)
  // Initialize with empty array, we'll load from localStorage in useEffect
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage once we're on the client
  useEffect(() => {
    try {
      const raw = localStorage.getItem("favourites");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setFavourites(parsed.map(String));
        }
      }
    } catch (e) {
      console.error("Failed to read favourites from localStorage", e);
    }
  }, []); // Run once on mount

  // Flag to indicate an add/remove is in progress.
  const [isLoading, setIsLoading] = useState(false);

  // Whenever `favourites` changes, persist the new array to localStorage.
  // We stringify the array because localStorage only stores strings.
  // Save to localStorage whenever favourites change
  useEffect(() => {
    // Skip initial save when favourites is empty
    if (favourites.length === 0) return;

    try {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch (e) {
      console.error("Failed to save favourites to localStorage", e);
    }
  }, [favourites]);

  // Add a movie id to favourites. The id is normalized to a string to
  // avoid mismatches between numbers and strings. The setter uses the
  // functional form to avoid stale closures.
  const addFavourite = useCallback((movieId) => {
    // If invalid ids
    if (movieId === undefined || movieId === null) return;

    // Normalize to string - avoid mismatches between numbers and strings
    const id = String(movieId);
    setIsLoading(true);
    setFavourites((prev) => {
      // Prevent duplicate entries
      if (prev.includes(id)) return prev;
      // Append
      return [...prev, id];
    });
    setIsLoading(false);
  }, []);

  // Remove a movie id from favourites.
  const removeFavourite = useCallback((movieId) => {
    if (movieId === undefined || movieId === null) return;
    const id = String(movieId);
    setIsLoading(true);
    // remove
    setFavourites((prev) => prev.filter((x) => x !== id));
    setIsLoading(false);
  }, []);

  // Helper to check if a movie id already in favourites.
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

// Custom hook
export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
