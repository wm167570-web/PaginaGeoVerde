import { motion } from 'motion/react';
import { ArrowRight, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';
import { OptimizedImage } from './ui/OptimizedImage';

import causaSemana from '../data/causaSemana.json';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center max-md:px-2 bg-black text-white text-sm pb-28 pt-32 bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/green-gradient-bg.svg)] bg-top bg-no-repeat font-sans min-h-screen">

        <div className="relative group overflow-hidden bg-green-900/60 p-0.5 mt-10 md:mt-12 rounded-full active:scale-100 hover:scale-105 transition-all duration-300 text-xs">
            <Link to="/vive-consciente" className="flex items-center justify-center text-white/90 hover:text-white bg-gradient-to-t from-green-950/80 to-black rounded-full pr-4 pl-1.5 py-1.5 h-full w-full relative z-10 transition-colors cursor-pointer font-medium">
                <div className="flex items-center">
                    <OptimizedImage className="w-7 h-7 rounded-full border-[3px] border-[#0A0A0A] object-cover"
                        src={causaSemana.imagen} alt="Miniatura" width={28} height={28} priority={true} />
                    <div className="w-7 h-7 rounded-full border-[3px] border-[#0A0A0A] -translate-x-2 bg-green-800 flex items-center justify-center text-[10px]">
                       🌿
                    </div>
                    <div className="w-7 h-7 rounded-full border-[3px] border-[#0A0A0A] -translate-x-4 bg-gray-800 flex items-center justify-center text-[10px]">
                       ✨
                    </div>
                </div>
                <span className="-translate-x-2">Conoce Nuestra Filosofía</span>
            </Link>
            <div className="absolute -bottom-16 group-hover:-bottom-12 transition-all duration-500 left-1/2 z-0 -translate-x-1/2 blur-[20px] size-24 rounded-full bg-green-500/60"></div>
        </div>

        <h1 className="text-4xl md:text-6xl text-center font-semibold max-w-4xl mt-6 bg-gradient-to-r from-white to-[#748298] text-transparent bg-clip-text leading-tight drop-shadow-md tracking-tight">
            {content.hero.title}
        </h1>
        
        <p className="text-slate-300 md:text-lg max-md:px-4 text-center max-w-2xl mt-5 leading-relaxed font-light">
            {content.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 text-sm px-4">
            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100 w-full sm:w-auto shadow-[0_0_15px_rgba(22,163,74,0.3)]">
                <a 
                    href="https://m.youtube.com/@GeoVerdeCon100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 transition-colors rounded-full flex items-center justify-center gap-2 font-medium"
                >
                    Ver en YouTube
                    <Youtube className="w-5 h-5" />
                </a>
            </div>
            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100 w-full sm:w-auto">
                <a 
                    href="https://geoverdevidaconsciente.com/#blog"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors rounded-full px-8 py-3 font-medium text-white"
                >
                    <span>Explorar Blog</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
                </a>
            </div>
        </div>

        <div className="mt-24 w-full text-center flex flex-col items-center px-4">
            <p className="text-xs text-white/50 mb-6 font-medium uppercase tracking-[0.2em]">Nuestra Labor Semanal</p>
            <div className="relative mx-auto w-full max-w-5xl group mt-2">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-[300px] bg-green-500/10 blur-[120px] z-0 rounded-full"></div>
                <div className="relative z-10 w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(22,163,74,0.1)] bg-gray-950 backdrop-blur-sm aspect-video md:aspect-[21/9]">
                    <OptimizedImage 
                      src={causaSemana.imagen} 
                      alt={causaSemana.titulo}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[1.5s] mix-blend-screen opacity-70 group-hover:opacity-100"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10 pointer-events-none text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-400 mb-3 block opacity-90 drop-shadow-sm">Causa de la Semana</span>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 drop-shadow-lg text-white tracking-tight">{causaSemana.titulo}</h3>
                        {causaSemana.descripcion && (
                            <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed font-light drop-shadow-md">{causaSemana.descripcion}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    </section>
  );
}
