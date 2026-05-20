import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';
import { OptimizedImage } from './ui/OptimizedImage';
import Tooltip from './ui/Tooltip';
import { useRef, useEffect, useState } from 'react';

import causaSemana from '../data/causaSemana.json';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-surface">
      {/* Background Image Watermark */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ y: isMobile ? 0 : yBackground }}
      >
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" 
          alt="Conciencia ambiental background" 
          className="w-full h-full object-cover grayscale mix-blend-overlay"
          width={1920}
          height={1080}
          loading="lazy"
        />
      </motion.div>

      {/* Abstract background elements - using palette blobs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-earth/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-sky/20 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-[30vw] h-[30vw] bg-brand-secondary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 bg-white/40 backdrop-blur-md rounded-[3rem] p-4 md:p-20 border border-brand-forest/5 group overflow-hidden shadow-2xl shadow-brand-forest/5">
        
        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1467617263073-f6ca849867b2" 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover mix-blend-multiply scale-110 group-hover:scale-100 transition-transform duration-[5s]"
            width={1920}
            height={1080}
            loading="lazy"
          />
        </div>
        
        <motion.div
          style={{ 
            y: isMobile ? 0 : yTitle,
            opacity: opacityText 
          }}
        >
          <motion.div
            style={{ y: isMobile ? 0 : yContent }}
          >
            <Tooltip text="Nuestra Filosofía" position="top">
              <Link 
                to="/vive-consciente"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary text-brand-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-6 shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                VIVE CONSCIENTE
              </Link>
            </Tooltip>
            <h1 className="text-balance font-serif text-5xl md:text-8xl font-black italic leading-[0.95] text-brand-primary mb-8 tracking-tighter">
              {content.hero.title}
            </h1>
            <p className="max-w-prose text-[17px] leading-[1.75] text-brand-forest/70 mb-10 border-l-4 border-brand-sky pl-6 font-bold">
              {content.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://m.youtube.com/@GeoVerdeCon100"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-brand-primary text-white border-2 border-brand-primary px-8 py-4 rounded-full font-bold transition-all hover:bg-transparent hover:text-brand-primary shadow-xl shadow-brand-primary/20"
              >
                Ver en YouTube
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://geoverdevidaconsciente.com/#blog"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 bg-transparent text-brand-earth border-2 border-brand-earth px-8 py-4 rounded-full font-bold transition-all hover:bg-brand-earth hover:text-white"
              >
                Explorar Blog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: isMobile ? 0 : yContent }}
          className="relative perspective-1000 hidden md:block"
        >
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-3 transform transition-transform hover:skew-y-0 duration-700">
            <OptimizedImage 
              src={causaSemana.imagen} 
              alt={causaSemana.titulo}
              className="object-cover w-full h-full scale-100 hover:scale-110 transition-transform duration-[1000ms]"
              width={1000}
              height={1250}
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-black/20 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-80 mb-2 block animate-pulse">Causa de la Semana</span>
              <h3 className="text-balance font-serif text-3xl font-bold italic text-white drop-shadow-md mb-2">{causaSemana.titulo}</h3>
              {causaSemana.descripcion && (
                <p className="text-sm text-white/90 font-medium leading-relaxed drop-shadow-sm line-clamp-2">{causaSemana.descripcion}</p>
              )}
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-white p-8 rounded-2xl shadow-2xl border border-brand-accent/20"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-serif font-bold text-brand-primary">100+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-forest opacity-60">Videos Publicados</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
