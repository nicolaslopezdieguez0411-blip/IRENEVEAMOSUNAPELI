'use client'; 
import { useState } from 'react';

export default function Home() {
  const [paso, setPaso] = useState(1);
  const [genero, setGenero] = useState('');
  const [flores, setFlores] = useState<{ id: number; left: string }[]>([]);

  const peliculas: any = {
    risas: ["La Máscara", "El Dictador", "¿Y dónde están las rubias?", "Supercool"],
    accion: ["El Club de la Lucha", "Bastardos sin gloria", "Siete pecados capitales", "Drive"],
    miedo: ["Hermana Muerte", "Verónica", "Hogar", "Eli"],
    dibujos: ["Los Minions", "Shrek", "El cadáver de la novia", "Madagascar"]
  };

  const estilos: any = {
    risas: { bg: 'bg-yellow-100', text: 'text-orange-600', btn: 'bg-yellow-400', border: 'border-yellow-500', emoji: '😂' },
    accion: { bg: 'bg-zinc-900', text: 'text-red-500', btn: 'bg-red-600', border: 'border-red-800', emoji: '🔥' },
    miedo: { bg: 'bg-purple-950', text: 'text-purple-300', btn: 'bg-black', border: 'border-purple-600', emoji: '💀' },
    dibujos: { bg: 'bg-sky-100', text: 'text-sky-600', btn: 'bg-sky-400', border: 'border-sky-500', emoji: '🌈' },
    default: { bg: 'bg-[#ffe4e6]', text: 'text-[#db2777]', btn: 'bg-[#f472b6]', border: 'border-white' }        
  };

  const configActual = estilos[genero] || estilos.default;

  const lanzarEfecto = () => {
    const nuevas = Array.from({ length: 15 }).map((_, i) => ({
      id: Math.random(),
      left: Math.random() * 100 + '%'
    }));
    setFlores(nuevas);
    setTimeout(() => setFlores([]), 3000);
  };

  const enviarMensaje = (peli: string) => {
    const telefono = "34613143562";
    const mensaje = `Hola Nico, me encantaría ver esta peli contigo: ${peli}`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <main className={`relative overflow-hidden flex min-h-screen flex-col items-center justify-center p-4 text-center transition-all duration-700 ${configActual.bg}`}> 

      {/* Efecto de flores cayendo */}
      {flores.map((f) => (
        <span key={f.id} className="absolute top-[-20px] text-2xl animate-bounce" style={{ left: f.left, transition: 'top 3s ease-in' }}>
          🌸
        </span>
      ))}

      {paso === 1 && (
        <div className="space-y-6">
          <h1 onClick={lanzarEfecto} className="text-4xl md:text-6xl font-bold text-[#db2777] cursor-pointer hover:scale-110 active:scale-95 transition-all">
            ¡Hola, <span className="underline decoration-white">Irene</span>! ✨
          </h1>
          <p className="text-lg text-[#be185d] font-medium">¿Hacemos plan de peli hoy?</p>
          <button onClick={() => setPaso(2)} className="bg-[#f472b6] hover:bg-[#db2777] text-white font-bold py-4 px-10 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all text-xl border-4 border-white">   
            ¡Siii! 🍿
          </button>
        </div>
      )}

      {paso === 2 && (
        <div className="space-y-6 w-full max-w-xs">      
          <h2 className="text-3xl font-bold text-[#db2777] mb-8">¿Qué te apetece hoy?</h2>
          <div className="flex flex-col gap-4">
            <button onClick={() => {setGenero('risas'); setPaso(3)}} className="bg-white text-orange-500 border-2 border-orange-200 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-sm">🎬 Risas 😂</button>
            <button onClick={() => {setGenero('accion'); setPaso(3)}} className="bg-zinc-800 text-white border-2 border-zinc-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-sm">💥 Acción 🔥</button>
            <button onClick={() => {setGenero('miedo'); setPaso(3)}} className="bg-purple-900 text-purple-200 border-2 border-purple-700 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-sm">😱 De miedo 👻</button>
            <button onClick={() => {setGenero('dibujos'); setPaso(3)}} className="bg-sky-400 text-white border-2 border-sky-300 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-sm">🧸 Dibujos 🌈</button> 
          </div>
        </div>
      )}

      {paso === 3 && (
        <div className="space-y-6 w-full max-w-sm">      
          <h2 className={`text-3xl font-bold ${configActual.text}`}>{configActual.emoji} ¡A elegir! {configActual.emoji}</h2>
          <div className={`bg-white/80 p-6 rounded-3xl border-4 ${configActual.border} shadow-2xl`}>
            <div className="flex flex-col gap-3">       
              {peliculas[genero].map((peli: string, i: number) => (
                <button key={i} onClick={() => enviarMensaje(peli)} className={`w-full text-left font-bold p-4 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all ${configActual.btn} text-white`}>
                  {peli}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => {setGenero(''); setPaso(2)}} className="bg-white text-zinc-800 py-2 px-8 rounded-full font-bold shadow-md mt-4">Atrás</button>        
        </div>
      )}
    </main>
  );
}