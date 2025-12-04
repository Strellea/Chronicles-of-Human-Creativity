import React from "react";
import { Link } from "@inertiajs/react";

export default function Header() {
  return (
    <header className="w-full fixed top-0 z-50 bg-black/40 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-orange-300 rounded-lg flex items-center justify-center font-bold text-black">
            C
          </div>
          <h1 className="text-white font-semibold">Chronicles</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-white/80 hover:text-white">
            Login
          </Link>
          <Link
            href="/register"
            className="px-3 py-1 border border-white/30 rounded-md text-white/80 hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
