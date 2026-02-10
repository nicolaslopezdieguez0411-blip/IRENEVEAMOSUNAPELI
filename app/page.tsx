'use client'; 
import { useState, useEffect } from 'react';

export default function Home() {
  const [paso, setPaso] = useState(1); 
  const [genero, setGenero] = useState('');
  const [confeti, setConfeti] = useState<{ id: number; left: string; anim: string }[]>([]);

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
    default: { bg: 'bg-[#ffe4e6]', text: 'text-[#db2777]', btn: 'bg-[#f472b6]', border: 'border-white', emoji: '' }
  };

  const configActual = estilos[genero] || estilos.default;

  // Función de confeti propia (sin librerías)
  const lanzarConfeti = () => {
    const nuevosConfetis = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100 + '%',
      anim: Math.random() > 0.5 ? 'animate-bounce' : 'animate-ping'
    }));
    setConfeti(nuevosConfetis);
    setTimeout(() => setConfeti([]), 3000);
  };

  const enviarMensaje = (peli: string) => {
    const telefono = "34613143562"; 
    const mensaje = `Hola Nico, me encantaría ver esta peli contigo: ${peli}`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <main className={`relative overflow-hidden flex min-h-screen flex-col items-center justify-center p-4 text-center transition-all duration-700 ${configActual.bg}`}>
      
      {/* Lluvia de Emojis */}
      {confeti.map((c) => (
        <span key={c.id} className={`absolute top-0 text-2xl ${c.anim}`} style={{ left: c.left, transition: 'top 3s linear' }}>
          🌸
        </span>
      ))}

      {paso === 1 && (
        <div className="space-y-6">
          <h1 onClick={lanzarConfeti} className="text-4xl md:text-6xl font-bold text-[#db2777] cursor-pointer hover:scale-110 active:scale-95 transition-all">
            ¡Hola, <span className="underline decoration-white">Irene</span>! ✨
          </h1>
          <p className="text-lg text-[#be185d] font-medium italic">¿Hacemos plan de peli hoy?</p>
          <button onClick={() => setPaso(2)} className="bg-[#f472b6] hover:bg-[#db2777] text-white font-bold py-4 px-10 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-all text-xl border-4 border-white">
            ¡Siii! 🍿
          </button>
        </div>
      )}

      {paso === 2 && (
        <div className="space-y-6 w-full max-w-xs">
          <h2 className="text-3xl font-bold text-[#db2777] mb-8">¿Qué te apetece hoy?</h2>
          <div className="flex flex-col gap-4">
            {['risas', 'accion', 'miedo', 'dibujos'].map((g) => (
              <button key={g} onClick={() => {setGenero(g); setPaso(3)}} className="bg-white text-zinc-800 border-2 border-pink-200 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-sm capitalize">
                {g === 'risas' ? '🎬 Risas' : g === 'accion' ? '💥 Acción' : g === 'miedo' ? '😱 Miedo' : '🧸 Dibujos'}
              </button>
            ))}
          </div>
          <button onClick={() => setPaso(1)} className="mt-4 text-[#f472b6] text-sm underline">Volver</button>
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