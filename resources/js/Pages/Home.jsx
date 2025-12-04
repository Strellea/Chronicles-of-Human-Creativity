import React from "react";
import AppLayout from "../Layouts/AppLayout";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import IntroBlock from '../Components/IntroBlock';

export default function Home() {
  const scrollToStory = () => {
    const el = document.getElementById("story-start");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppLayout>
      <Header />
      <Hero onBegin={scrollToStory} />

      <section id="story-start" className="py-20 px-6">
        <h2 className="text-3xl font-bold">This is where the story begins…</h2>
      </section>

      <IntroBlock />
    </AppLayout>
  );
}