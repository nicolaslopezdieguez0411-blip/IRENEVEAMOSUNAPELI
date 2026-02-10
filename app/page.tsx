'use client'; 
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [paso, setPaso] = useState(1); 
  const [genero, setGenero] = useState('');

  const peliculas = {
    risas: ["La Máscara", "El Dictador", "¿Y dónde están las rubias?", "Supercool"],
    accion: ["El Club de la Lucha", "Bastardos sin gloria", "Siete pecados capitales", "Drive"],
    miedo: ["Hermana Muerte", "Verónica", "Hogar", "Eli"],
    dibujos: ["Los Minions", "Shrek", "El cadáver de la novia", "Madagascar"]
  };

  const estilos = {
    risas: { bg: 'bg-yellow-100', text: 'text-orange-600', btn: 'bg-yellow-400', border: 'border-yellow-500', emoji: '😂' },
    accion: { bg: 'bg-zinc-900', text: 'text-red-500', btn: 'bg-red-600', border: 'border-red-800', emoji: '🔥' },
    miedo: { bg: 'bg-purple-950', text: 'text-purple-300', btn: 'bg-black', border: 'border-purple-600', emoji: '💀' },
    dibujos: { bg: 'bg-sky-100', text: 'text-sky-600', btn: 'bg-sky-400', border: 'border-sky-500', emoji: '🌈' },
    default: { bg: 'bg-[#ffe4e6]', text: 'text-[#db2777]', btn: 'bg-[#f472b6]', border: 'border-white' }
  };

  const configActual = estilos[genero] || estilos.default;

  const lanzarConfeti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#db2777', '#fbcfe8', '#ffffff']
    });
  };

  const enviarMensaje = (peli) => {
    const telefono = "34613143562"; 
    const mensaje = `Hola Nico, me encantaría ver esta peli contigo: ${peli}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 text-center transition-all duration-700 ${configActual.bg}`}>
      
      {/* PANTALLA 1: INICIO */}
      {paso === 1 && (
        <div className="space-y-6">
          <h1 onClick={lanzarConfeti} className="text-4xl md:text-6xl font-bold text-[#db2777] cursor-pointer hover:scale-110 active:scale-95 transition-all">
            ¡Hola, <span className="underline decoration-white">Irene</span>! ✨
          </h1>
          <p className="text-lg text-[#be185d] font-medium">¿Hacemos plan de peli hoy?</p>
          <button 
            onClick={() => setPaso(2)} 
            className="bg-[#f472b6] hover:bg-[#db2777] text-white font-bold py-4 px-10 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all text-xl border-4 border-white"
          >
            ¡Siii! 🍿
          </button>
        </div>
      )}

      {/* PANTALLA 2: GÉNEROS */}
      {paso === 2 && (
        <div className="space-y-6 w-full max-w-xs">
          <h2 className="text-3xl font-bold text-[#db2777] mb-8">¿Qué te apetece?</h2>
          <div className="flex flex-col gap-4">
            <button onClick={() => {setGenero('risas'); setPaso(3)}} className="bg-white text-orange-500 border-2 border-orange-200 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-sm">
              🎬 Risas 😂
            </button>
            <button onClick={() => {setGenero('accion'); setPaso(3)}} className="bg-zinc-800 text-white border-2 border-zinc-600 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-sm">
              💥 Acción (Estilo Fight Club)
            </button>
            <button onClick={() => {setGenero('miedo'); setPaso(3)}} className="bg-purple-900 text-purple-200 border-2 border-purple-700 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-sm">
              😱 De miedo 👻
            </button>
            <button onClick={() => {setGenero('dibujos'); setPaso(3)}} className="bg-sky-400 text-white border-2 border-sky-300 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-sm">
              🧸 Dibujos 🌈
            </button>
          </div>
          <button onClick={() => setPaso(1)} className="mt-4 text-[#f472b6] text-sm underline">Volver</button>
        </div>
      )}

      {/* PANTALLA 3: LISTA DE PELIS */}
      {paso === 3 && (
        <div className="space-y-6 w-full max-w-sm">
          <h2 className={`text-3xl font-bold ${configActual.text}`}>
            {configActual.emoji} ¡A elegir! {configActual.emoji}
          </h2>
          <div className={`bg-white/80 p-4 rounded-3xl border-4 ${configActual.border} shadow-2xl`}>
            <div className="flex flex-col gap-3">
              {peliculas[genero].map((peli, index) => (
                <button 
                  key={index}
                  onClick={() => enviarMensaje(peli)}
                  className={`w-full text-left font-bold p-4 rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-between ${configActual.btn} text-white`}
                >
                  <span>{peli}</span>
                  <span className="text-[10px] bg-white/20 px-2 py-1 rounded">ELEGIR</span>
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => {setGenero(''); setPaso(2)}} 
            className="bg-white text-zinc-800 py-2 px-8 rounded-full font-bold hover:scale-105 transition-all shadow-md mt-4"
          >
            Atrás
          </button>
        </div>
      )}
    </main>
  );
}
