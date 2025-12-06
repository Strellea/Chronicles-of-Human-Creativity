// resources/js/Pages/Timeline.jsx

import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import TimelineSection from '@/Components/Timeline/TimelineSection';
import ArtworkModal from '@/Components/Timeline/ArtworkModal';
import TimelineHero from '@/Components/Timeline/TimelineHero';
import ThreeBackground from '@/Components/ThreeBackground';
import { getCuratedTimeline } from '@/lib/metMuseum';

const timelinePeriods = [
  {
    id: 'renaissance',
    title: 'Renaissance',
    period: '1400â€“1600',
    description: 'The rebirth of classical learning and the birth of humanism',
    color: 'from-amber-900 to-orange-800',
  },
  {
    id: 'baroque',
    title: 'Baroque & Classical',
    period: '1600â€“1800',
    description: 'Drama, grandeur, and emotional intensity meet enlightenment rationality',
    color: 'from-purple-900 to-indigo-800',
  },
  {
    id: 'romanticism',
    title: 'Romanticism â†’ Impressionism',
    period: '1800â€“1900',
    description: 'From emotional landscapes to capturing fleeting moments of light',
    color: 'from-blue-900 to-cyan-800',
  },
  {
    id: 'modern',
    title: 'Modern Art',
    period: '1900â€“2000',
    description: 'Breaking boundaries: from Cubism to Abstract Expressionism',
    color: 'from-red-900 to-pink-800',
  },
  {
    id: 'contemporary',
    title: 'Contemporary',
    period: '2000â€“Present',
    description: 'Digital revolution meets global perspectives in art',
    color: 'from-green-900 to-emerald-800',
  },
];

export default function Timeline() {
  const [timelineData, setTimelineData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [currentArtworks, setCurrentArtworks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadTimelineData();
  }, []);

  const loadTimelineData = async () => {
    setLoading(true);
    const data = {};

    for (const period of timelinePeriods) {
      const artworks = await getCuratedTimeline(period.id, 5);
      data[period.id] = artworks;
    }

    setTimelineData(data);
    setLoading(false);
  };

  const handleArtworkClick = (artwork, artworks, index) => {
    setSelectedArtwork(artwork);
    setCurrentArtworks(artworks);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  const handlePrev = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedArtwork(currentArtworks[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedArtwork(currentArtworks[newIndex]);
  };

  return (
    <AppLayout>
      <Head title="Art Timeline - Chronicles of Human Creativity" />

      {/* Global 3D Background - Fixed position */}
      <ThreeBackground />

      <div className="relative min-h-screen">
        <TimelineHero />

        {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
              <p className="text-white text-xl">Loading masterpieces...</p>
            </div>
          </div>
        ) : (
          <>
            {timelinePeriods.map((period, index) => (
              <TimelineSection
                key={period.id}
                period={period}
                artworks={timelineData[period.id] || []}
                onArtworkClick={handleArtworkClick}
              />
            ))}
          </>
        )}

        {/* Footer */}
        <footer className="bg-gradient-to-b from-gray-900 to-black py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 text-lg mb-4">
              Data sourced from The Metropolitan Museum of Art Collection API
            </p>
            <p className="text-gray-500">
              This journey represents centuries of human creativity, innovation, and expression
            </p>
          </div>
        </footer>

        {/* Artwork Modal */}
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < currentArtworks.length - 1}
          />
        )}
      </div>
    </AppLayout>
  );
}