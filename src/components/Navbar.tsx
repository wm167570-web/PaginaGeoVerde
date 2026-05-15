import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Tooltip from './ui/Tooltip';
import content from '../data/content.json';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-brand-forest/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/">
          <Tooltip text="Ir al Inicio" position="bottom">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Logo className="w-12 h-12" />
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-primary">
                {content.channel.name}
              </span>
            </motion.div>
          </Tooltip>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-brand-forest">
          <Tooltip text="Ver videos" position="bottom">
            <a href="/#videos" className="hover:text-brand-primary transition-colors">Videos</a>
          </Tooltip>
          <Tooltip text="Leer noticias" position="bottom">
            <a href="/#blog" className="hover:text-brand-primary transition-colors">Noticias</a>
          </Tooltip>
          <Tooltip text="Descargar material" position="bottom">
            <a href="/#resources" className="hover:text-brand-primary transition-colors">Recursos</a>
          </Tooltip>
          <Tooltip text="Contactar" position="bottom">
            <a href="/#contact" className="hover:text-brand-primary transition-colors">Contacto</a>
          </Tooltip>
        </div>

        <div className="flex items-center gap-4">
          <Tooltip text="Canal de YouTube" position="bottom">
            <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-brand-primary text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
              Suscribirse
            </a>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}
