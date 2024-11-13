// components/WelcomeMessage.jsx
"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typewriter from "@/components/typeWriter";

export default function WelcomeMessage({ images, fullText, onWelcomeEnd }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("hasSeenWelcome", "true");
      onWelcomeEnd();
    }, 10000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearInterval(imageInterval);
    };
  }, [images, onWelcomeEnd]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-900 via-indigo-900 to-black h-screen text-white yagora">
      <div className="text-center">
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt="Welcome"
            className="mx-auto mb-4 w-auto h-64"
          />
        )}
        <div className="font-bold text-3xl wonder">
          <Typewriter text={fullText} speed={80} />
        </div>
      </div>
    </div>
  );
}

WelcomeMessage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  fullText: PropTypes.string.isRequired,
  onWelcomeEnd: PropTypes.func.isRequired,
};
