import { motion } from 'motion/react';
import { Youtube, Instagram, Music, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from './ui/Tooltip';
import content from '../data/content.json';

export default function Footer() {
  return (
    <footer className="bg-brand-earth py-24 border-t border-brand-forest/10 relative overflow-hidden">
      {/* Subtle Environmental Awareness Background */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920" 
          alt="Environmental Awareness" 
          className="w-full h-full object-cover grayscale mix-blend-multiply"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-sm">
            <Link to="/">
              <Tooltip text="Volver arriba" position="right">
                <div className="flex items-center gap-4 mb-6 cursor-pointer">
                  <img
                    src="/logo-geoverde.png"
                    alt="Logo GeoVerde Vida Consciente"
                    className="w-16 h-16 object-contain"
                  />
                  <span className="font-serif text-3xl font-bold tracking-tight text-brand-primary">
                    {content.channel.name}
                  </span>
                </div>
              </Tooltip>
            </Link>
            <p className="text-[#30431b] font-bold text-2xl mb-8 leading-relaxed italic font-serif">
              "{content.channel.description}"
            </p>
            <div className="flex items-center gap-6">
              <Tooltip text="Instagram" position="top">
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={content.channel.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-forest hover:text-brand-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </Tooltip>
              <Tooltip text="TikTok" position="top">
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={content.channel.social.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-forest hover:text-brand-primary transition-colors"
                >
                  <Music className="w-5 h-5" />
                </motion.a>
              </Tooltip>
              <Tooltip text="Facebook" position="top">
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={content.channel.social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-forest hover:text-brand-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </Tooltip>
              <Tooltip text="YouTube" position="top">
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={content.channel.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-forest hover:text-brand-primary transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-[18px] font-bold uppercase tracking-widest text-brand-forest opacity-60">Explorar</span>
              <Tooltip text="Ver videos" position="right">
                <a href="/#videos" className="text-sm font-bold hover:text-brand-primary transition-colors">Videos</a>
              </Tooltip>
              <Tooltip text="Blog" position="right">
                <Link to="/blog" className="text-sm font-bold hover:text-brand-primary transition-colors">Noticias</Link>
              </Tooltip>
              <Tooltip text="Material gratis" position="right">
                <a href="/#resources" className="text-sm font-bold hover:text-brand-primary transition-colors">Recursos</a>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[18px] font-bold uppercase tracking-widest text-brand-forest opacity-60">Legal</span>
              <Tooltip text="Nuestra política" position="right">
                <Link to="/privacidad" className="text-sm font-bold hover:text-brand-primary transition-colors">Privacidad</Link>
              </Tooltip>
              <Tooltip text="Condiciones de uso" position="right">
                <Link to="/terminos" className="text-sm font-bold hover:text-brand-primary transition-colors">Términos</Link>
              </Tooltip>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-brand-forest/10 flex justify-center items-center text-center">
          <span className="text-[0.9rem] md:text-base font-medium tracking-[0.05em] text-[#F3F0DF]/80" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            © 2026 GEOVERDE VIDA CONSCIENTE. LIDERANDO LA EDUCACIÓN AMBIENTAL HOLÍSTICA.
          </span>
        </div>
      </div>
    </footer>
  );
}
