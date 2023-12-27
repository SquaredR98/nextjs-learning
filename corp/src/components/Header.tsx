import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="absolute text-white z-10 w-full bg-gradient-to-b text-white from-black via-black-70 to-black/0 h-32">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <nav className="container relative flex flex-wrap items-center justify-between mx-auto py-4">
          <Link
            className="text-3xl font-bold hover:text-slate-300"
            href="/"
          >
            Home
          </Link>
          <div className="space-x-4 text-xl">
            <Link
              className="hover:text-slate-300"
              href="/performance"
            >
              Performance
            </Link>
            <Link
              className="hover:text-slate-300"
              href="/reliability"
            >
              Reliability
            </Link>
            <Link
              className="hover:text-slate-300"
              href="/scale"
            >
              Scale
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
