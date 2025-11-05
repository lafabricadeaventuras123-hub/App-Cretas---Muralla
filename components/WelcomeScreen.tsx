import React from 'react';
import { CalatravaCrossIcon } from './IconComponents';

interface WelcomeScreenProps {
  onStart: () => void;
  error: string | null;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, error }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CalatravaCrossIcon />
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-100 drop-shadow-lg">¡Desafío del Centinela!</h1>
        <p className="text-xl md:text-2xl mt-1 text-amber-300">La Orden de Calatrava</p>
      </div>
      <p className="text-base md:text-lg text-stone-300 leading-relaxed max-w-prose mt-4">
        "¡Bienvenido a Cretas! Soy el guardián de esta villa. Para probar tu valía y conocimiento, deberás responder a mi desafío sobre la gloriosa Orden de Calatrava. Solo si aciertas 5 preguntas, te permitiré el paso. ¿Aceptas el reto?"
      </p>
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">¡Un contratiempo!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}
      <button
        onClick={onStart}
        className="mt-4 bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg text-xl tracking-wider transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg shadow-black/50 border-2 border-amber-800"
      >
        Aceptar Desafío
      </button>
    </div>
  );
};

export default WelcomeScreen;
