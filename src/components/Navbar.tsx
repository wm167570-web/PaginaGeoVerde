import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Tooltip from './ui/Tooltip';
import content from '../data/content.json';
const NAV_LINKS = [
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Videos', href: '/#videos' },
  { name: 'Noticias', href: 'https://geoverdevidaconsciente.com/#blog' },
  { name: 'Recursos', href: 'https://geoverdevidaconsciente.com/#resources' },
  { name: 'Contacto', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', `#${targetId}`);
        setActiveHash(href);
        setMobileOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-green-900/90 backdrop-blur-[20px] border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between transition-all duration-300">
        <Link 
          to="/" 
          className="z-50" 
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Tooltip text="Ir al Inicio" position="bottom">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer logo-container"
              animate={{ scale: isScrolled ? 0.9 : 1 }}
            >
              <img 
                src="/logo-geoverde.png"
                alt="Logo GeoVerde Vida Consciente"
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
              />
              <span className="hidden sm:block font-serif text-[#27e81e] text-lg font-bold tracking-tight brand-name">
                GeoVerde Vida Consciente
              </span>
            </motion.div>
          </Tooltip>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
          {NAV_LINKS.map(link => (
            link.href.startsWith('http') ? (
              <a 
                key={link.name}
                href={link.href}
                className={`relative py-1 group ${isScrolled ? 'text-white' : 'text-brand-primary hover:text-brand-primary'}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="relative z-10">{link.name}</span>
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`relative py-1 group ${isScrolled ? 'text-white' : 'text-brand-primary hover:text-brand-primary'}`}
                onClick={(e) => handleScroll(e, link.href)}
              >
                <span className="relative z-10">{link.name}</span>
                {activeHash === link.href && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-secondary" />
                )}
              </Link>
            )
          ))}
          <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-brand-primary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg">
            Suscribirse
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden z-[10000] text-white p-2 menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a 
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={link.href}
                {...(link.href.startsWith('http') ? { target: "_blank", rel: "noreferrer" } : {})}
                className="text-4xl font-serif text-white hover:text-brand-secondary"
                onClick={(e: React.MouseEvent) => handleScroll(e, link.href)}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
