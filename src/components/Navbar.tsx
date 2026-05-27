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
  { name: 'Recursos', href: '/#resources' },
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
    } else {
        setMobileOpen(false);
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
    <div className={`fixed top-0 left-0 right-0 w-full z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
        <nav className={`flex items-center border mx-4 w-full max-w-5xl max-md:justify-between px-6 py-3 rounded-full text-white text-sm transition-all duration-300 relative ${isScrolled ? 'bg-black/90 backdrop-blur-md border-slate-700 shadow-lg' : 'bg-black/50 backdrop-blur-sm border-slate-700/80 shadow-md'}`}>
            <Link 
              to="/" 
              className="z-50 shrink-0" 
              onClick={(e) => {
                  if (window.location.pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
              }}
            >
              <Tooltip text="Ir al Inicio" position="bottom">
                <div className="flex items-center gap-3 cursor-pointer">
                  <img 
                    src="/logo-geoverde.png"
                    alt="Logo GeoVerde Vida Consciente"
                    className="h-8 w-auto object-contain transition-all duration-300"
                  />
                  <span className="hidden sm:block font-serif text-[#27e81e] font-bold tracking-tight">
                    GeoVerde Vida Consciente
                  </span>
                </div>
              </Tooltip>
            </Link>

            <div className="hidden md:flex items-center gap-6 ml-auto mr-8">
                {NAV_LINKS.map(link => (
                    link.href.startsWith('http') ? (
                        <a key={link.name} href={link.href} className="relative overflow-hidden h-6 group" target="_blank" rel="noreferrer">
                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-white/90 group-hover:text-white">{link.name}</span>
                            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-white">{link.name}</span>
                        </a>
                    ) : (
                        <Link key={link.name} to={link.href} className="relative overflow-hidden h-6 group" onClick={(e) => handleScroll(e, link.href)}>
                            <span className="block group-hover:-translate-y-full transition-transform duration-300 text-white/90 group-hover:text-white">{link.name}</span>
                            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-white">{link.name}</span>
                        </Link>
                    )
                ))}
            </div>

            <div className="hidden md:flex items-center gap-4 shrink-0">
                <Link to="/#contact" onClick={(e) => handleScroll(e, '/#contact')} className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition text-white">
                    Contacto
                </Link>
                <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
                    Suscribirse
                </a>
            </div>

            <button className="md:hidden text-white shrink-0 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-[120%] left-0 bg-black/95 backdrop-blur-md w-full flex flex-col items-center gap-6 py-8 rounded-2xl border border-slate-800 shadow-2xl md:hidden"
                    >
                         {NAV_LINKS.map((link, i) => (
                            link.href.startsWith('http') ? (
                                <motion.a 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={link.name} href={link.href} className="text-white hover:text-[#27e81e] text-lg font-medium" target="_blank" rel="noreferrer">
                                    {link.name}
                                </motion.a>
                            ) : (
                                <motion.Link 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={link.name} to={link.href} className="text-white hover:text-[#27e81e] text-lg font-medium" onClick={(e) => handleScroll(e, link.href)}>
                                    {link.name}
                                </motion.Link>
                            )
                        ))}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: NAV_LINKS.length * 0.05 }}
                            className="flex flex-col items-center gap-4 mt-2 w-full px-6"
                        >
                            <Link to="/#contact" onClick={(e) => handleScroll(e, '/#contact')} className="border border-slate-600 hover:bg-slate-800 px-8 py-3 rounded-full text-sm font-medium transition text-white w-full text-center">
                                Contacto
                            </Link>
                            <a href={content.channel.url} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300 w-full text-center">
                                Suscribirse
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    </div>
  );
}
