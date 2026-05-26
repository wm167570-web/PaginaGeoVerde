import { motion } from 'motion/react';
import { ArrowRight, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';
import { OptimizedImage } from './ui/OptimizedImage';
import causaSemana from '../data/causaSemana.json';

export default function Hero() {
  return (
    <header className="relative flex flex-col items-center bg-black text-white px-4 overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 font-sans">
        
        <Link 
            to="/vive-consciente"
            className="flex items-center gap-2 rounded-full border border-brand-accent/30 pl-1 pr-3 py-1 mt-8 hover:bg-white/5 transition-colors"
        >
            <span className="bg-brand-accent text-brand-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                VIVE CONSCIENTE
            </span>
            <span className="text-[13px] text-white/90 font-medium tracking-wide">Descubre Nuestra Filosofía</span>
        </Link>

        <h1 className="text-center text-[40px] leading-tight md:text-6xl lg:text-7xl mt-6 font-semibold max-w-4xl tracking-tight">
            {content.hero.title}
        </h1>
        <p className="text-center text-sm md:text-base lg:text-lg max-w-[558px] mt-4 text-white/70">
            {content.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <div className="button-bg rounded-full p-[2px] transition duration-300 w-full sm:w-auto h-full group hover:shadow-[0_0_2rem_-0.5rem_#00F5FF]">
                <a 
                    href="https://m.youtube.com/@GeoVerdeCon100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-3 px-8 text-sm py-2.5 text-white rounded-full font-medium bg-gray-900 w-full hover:bg-gray-800 transition-colors"
                >
                    Ver en YouTube
                    <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
            </div>
            
            <a 
                href="https://geoverdevidaconsciente.com/#blog"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all rounded-full px-8 py-2.5 w-full sm:w-auto text-sm font-medium cursor-pointer"
            >
                Explorar Blog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>

        <div className="mx-auto mt-16 md:mt-24 w-full max-w-7xl md:px-6 lg:px-10">
            <div className="relative mx-auto w-full max-w-5xl">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-[300px] bg-brand-accent blur-[150px] opacity-60 z-0 rounded-full animate-pulse"></div>
                <div className="relative z-10 w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-[2rem] border border-white/10 overflow-hidden bg-gray-900 shadow-2xl">
                    <OptimizedImage 
                      src={causaSemana.imagen} 
                      alt={causaSemana.titulo}
                      className="object-cover w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-700 mix-blend-luminosity hover:mix-blend-normal"
                      width={1200}
                      height={600}
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10 pointer-events-none">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2 block">Causa de la Semana</span>
                       <h3 className="text-2xl md:text-4xl font-semibold text-white mb-2 md:mb-3">{causaSemana.titulo}</h3>
                       {causaSemana.descripcion && (
                          <p className="text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">{causaSemana.descripcion}</p>
                       )}
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
