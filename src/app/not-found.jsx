// app/not-found.jsx

import Link from "next/link";
import { headers } from "next/headers"; // Used to get path info if needed

export default function NotFound() {
  // Optional: You can get the path that caused the 404

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-6xl font-extrabold text-blue-500 mb-4">404</h1>
      <h2 className="text-3xl mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-400 mb-8">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
