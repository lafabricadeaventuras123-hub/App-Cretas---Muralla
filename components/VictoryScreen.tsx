import React from 'react';
import { VictoryIcon } from './IconComponents';

interface VictoryScreenProps {}

const VictoryScreen: React.FC<VictoryScreenProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <VictoryIcon />
      <h1 className="text-3xl md:text-4xl font-bold text-amber-300 drop-shadow-lg">¡Has superado la prueba!</h1>
      <p className="text-base md:text-lg text-stone-300 leading-relaxed max-w-prose">
        "¡Enhorabuena! Has demostrado tener un conocimiento digno de un caballero. Tus respuestas han sido certeras. Tienes mi permiso para entrar en Cretas. ¡Adelante!"
      </p>
      <a
        href="https://wa.me/?text=He%20superado%20el%20desafío%20del%20centinela.%20Quiero%20continuar%20el%20tour%20por%20Cretas."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-xl tracking-wider transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg shadow-black/50 border-2 border-green-700"
      >
        Volver al tour por Whatsapp
      </a>
    </div>
  );
};

export default VictoryScreen;