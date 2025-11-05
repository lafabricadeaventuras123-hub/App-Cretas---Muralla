import React, { useEffect, useState } from 'react';

const SPLASH_IMAGE_URL = 'https://storage.googleapis.com/generative-ai-vision/user-assets/e699291f-a185-423c-82e7-8f78117c7688.jpg';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onFinish, 500); // Wait for fade-out animation
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`absolute inset-0 z-20 bg-cover bg-center ${exiting ? 'animate-fade-out' : 'animate-fade-in'}`}
      style={{ backgroundImage: `url(${SPLASH_IMAGE_URL})` }}
      aria-label="Un centinela de la Orden de Calatrava guardando la entrada a un pueblo medieval."
      role="img"
    >
    </div>
  );
};

export default SplashScreen;
