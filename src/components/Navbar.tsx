import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Tooltip from './ui/Tooltip';
import content from '../data/content.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/">
          <Tooltip text="Ir al Inicio" position="bottom">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center cursor-pointer"
            >
              <img 
                src="/assets/images/Logo%20corporativo.png"
                alt="GeoVerde - Vida Consciente"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </motion.div>
          </Tooltip>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-brand-forest">
          <Tooltip text="Ver videos" position="bottom"><a href="/#videos" className="hover:text-brand-primary transition-colors">Videos</a></Tooltip>
          <Tooltip text="Leer noticias" position="bottom"><a href="/#blog" className="hover:text-brand-primary transition-colors">Noticias</a></Tooltip>
          <Tooltip text="Descargar material" position="bottom"><a href="/#resources" className="hover:text-brand-primary transition-colors">Recursos</a></Tooltip>
          <Tooltip text="Contactar" position="bottom"><a href="/#contact" className="hover:text-brand-primary transition-colors">Contacto</a></Tooltip>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-3" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-4">
          <Tooltip text="Canal de YouTube" position="bottom">
            <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
              Suscribirse
            </a>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white overflow-hidden border-t"
          >
            <div className="flex flex-col p-6 gap-4 text-sm font-semibold uppercase tracking-widest text-brand-forest">
              <a href="/#videos" onClick={() => setIsOpen(false)}>Videos</a>
              <a href="/#blog" onClick={() => setIsOpen(false)}>Noticias</a>
              <a href="/#resources" onClick={() => setIsOpen(false)}>Recursos</a>
              <a href="/#contact" onClick={() => setIsOpen(false)}>Contacto</a>
              <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-brand-primary text-white px-6 py-3 rounded-full text-center mt-4">
                Suscribirse
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
