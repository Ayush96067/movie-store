import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MovieStore",
  description: "Search for any movie using the OMDb API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Logo of App : To be visible throught the website */}
        <div className=" bg-black w-full p-5 ">
          <Link
            href={"/"}
            className="cursor-pointer hover:text-gray-200 text-white text-base lg:text-xl left-2 rounded-full p-3 w-fit"
          >
            MovieStore
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
