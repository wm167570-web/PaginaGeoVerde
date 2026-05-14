import { motion } from 'motion/react';
import { Youtube, Instagram, Music, Facebook, Download, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoGrid from '../components/VideoGrid';
import BlogSection from '../components/BlogSection';
import ContactForm from '../components/ContactForm';
import Logo from '../components/Logo';
import content from '../data/content.json';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="font-sans antialiased bg-white">
      <Navbar />
      <Hero />
      <VideoGrid />
      
      {/* Resources Preview */}
      <section id="resources" className="py-24 bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-60 mb-6">Biblioteca GeoVerde</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold italic mb-10 leading-tight">
                Herramientas & Recursos para un Estilo de Vida Sostenible
              </h3>
              <p className="text-xl opacity-80 mb-12 max-w-xl">
                Descarga nuestras guías exclusivas, infografías y materiales educativos totalmente gratis.
              </p>
              <div className="flex flex-col gap-6">
                {content.resources.map((resource, i) => (
                  <motion.a 
                    key={i}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 20 }}
                    className="group flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Download className="w-6 h-6" />
                       </div>
                       <div>
                         <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1 block">{resource.type}</span>
                         <span className="text-lg font-bold">{resource.title}</span>
                       </div>
                    </div>
                    <ArrowRight className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-full absolute inset-0 blur-3xl animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=60&w=1000" 
                alt="Green Living"
                className="rounded-[4rem] relative z-10 shadow-3xl rotate-3 hover:rotate-0 transition-transform duration-1000"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <BlogSection />
      <ContactForm />

      <footer className="bg-brand-earth py-20 border-t border-brand-moss/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-4 mb-6 text-brand-green">
                <Logo className="w-16 h-16" />
                <span className="font-serif text-3xl font-bold tracking-tight">
                  {content.channel.name}
                </span>
              </div>
              <p className="text-brand-moss/60 mb-8 leading-relaxed italic font-serif text-lg">
                "{content.channel.description}"
              </p>
              <div className="flex items-center gap-6">
                <a href={content.channel.social.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-moss hover:text-brand-green transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href={content.channel.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-brand-moss hover:text-brand-green transition-colors"><Music className="w-5 h-5" /></a>
                <a href={content.channel.social.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-moss hover:text-brand-green transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href={content.channel.url} target="_blank" rel="noopener noreferrer" className="text-brand-moss hover:text-brand-green transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-moss opacity-50">Explorar</span>
                <a href="#videos" className="text-sm font-medium hover:text-brand-green transition-colors">Videos</a>
                <a href="#blog" className="text-sm font-medium hover:text-brand-green transition-colors">Noticias</a>
                <a href="#resources" className="text-sm font-medium hover:text-brand-green transition-colors">Recursos</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-moss opacity-50">Legal</span>
                <Link to="/privacidad" className="text-sm font-medium hover:text-brand-green transition-colors">Privacidad</Link>
                <Link to="/terminos" className="text-sm font-medium hover:text-brand-green transition-colors">Términos</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-brand-moss/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-moss opacity-40">
            <span>© 2026 {content.channel.name}. Todos los derechos reservados.</span>
            <span>Hecho con amor por la naturaleza</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
