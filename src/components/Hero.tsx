import { motion } from 'motion/react';
import { ArrowRight, Youtube } from 'lucide-react';
import content from '../data/content.json';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-earth">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-sky/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-forest text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            Nuevo Video Disponible
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] text-brand-primary mb-8 text-shadow-sm">
            {content.hero.title}
          </h1>
          <p className="text-lg text-brand-forest/80 leading-relaxed max-w-md mb-10">
            {content.hero.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={content.channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-brand-primary/30"
            >
              Ver en YouTube
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="#blog"
              className="group flex items-center gap-3 bg-white text-brand-sky border border-brand-sky/20 px-8 py-4 rounded-full font-bold transition-all hover:bg-brand-sky/5"
            >
              Explorar Blog
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative perspective-1000 hidden md:block"
        >
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-3 transform transition-transform hover:skew-y-0 duration-700">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=60&w=1000" 
              alt="Conciencia y Naturaleza"
              className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-[2000ms]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2 block">Causa del mes</span>
              <h3 className="font-serif text-3xl font-bold italic text-white drop-shadow-md">Reforestación Urbana en el Siglo XXI</h3>
            </div>
          </div>
          
          {/* Floating badge */}
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
