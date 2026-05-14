import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import content from '../data/content.json';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-brand-moss/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Logo className="w-12 h-12" />
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-green">
              {content.channel.name}
            </span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-brand-moss">
          <a href="/#videos" className="hover:text-brand-green transition-colors">Videos</a>
          <a href="/#blog" className="hover:text-brand-green transition-colors">Noticias</a>
          <a href="/#resources" className="hover:text-brand-green transition-colors">Recursos</a>
          <a href="/#contact" className="hover:text-brand-green transition-colors">Contacto</a>
        </div>

        <div className="flex items-center gap-4">
          <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-brand-green text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20">
            Suscribirse
          </a>
        </div>
      </div>
    </nav>
  );
}
