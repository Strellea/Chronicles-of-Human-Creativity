import React from "react";
import ThreeBackground from "../Components/ThreeBackground"; 

export default function AppLayout({ children }) {
  return (
    <div className="relative min-h-screen text-white bg-black">

      {/* GLOBAL 3D BACKGROUND  */}
      <div className="fixed inset-0 -z-10">
        <ThreeBackground />
      </div>

      {/* 🌑 DARK OVERLAY so the 3D isn't too bright */}
      <div className="fixed inset-0 bg-black/40 -z-5" />

      <main className="relative z-20">
        {children}
      </main>
    </div>
  );
}
