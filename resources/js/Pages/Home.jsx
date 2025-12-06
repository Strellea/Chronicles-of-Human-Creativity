import React from "react";
import AppLayout from "../Layouts/AppLayout";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Timeline from './Timeline'; 

export default function Home() {
  const scrollToTimeline = () => {
    const el = document.getElementById("timeline-start");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AppLayout>
      <Header />
      <Hero onBegin={scrollToTimeline} />
      <Timeline />
    </AppLayout>
  );
}