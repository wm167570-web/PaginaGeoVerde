import { motion } from 'motion/react';
import { Youtube, Instagram, Music, Facebook, Download, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoGrid from '../components/VideoGrid';
import BlogSection from '../components/BlogSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Tooltip from '../components/ui/Tooltip';
import content from '../data/content.json';

export default function Home() {
  return (
    <main className="font-sans antialiased bg-white">
      <Navbar />
      <Hero />
      <VideoGrid />
      
      {/* Resources Preview */}
      <section id="resources" className="py-24 bg-brand-forest text-white">
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
                         <span className="text-lg font-bold group-hover:text-brand-lime transition-colors">{resource.title}</span>
                       </div>
                    </div>
                    <ArrowRight className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square absolute inset-0 z-0 opacity-20 pointer-events-none rounded-[4rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1920" 
                  alt="Forest background decorative" 
                  className="w-full h-full object-cover blur-[2px] scale-110 group-hover:scale-100 transition-transform duration-[5s]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="aspect-square bg-white/5 rounded-full absolute inset-0 blur-3xl animate-pulse opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=60&w=1000" 
                alt="Green Living"
                className="rounded-[4rem] relative z-10 shadow-3xl rotate-3 hover:rotate-0 transition-transform duration-1000"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <BlogSection />
      <ContactForm />
      <Footer />
      <BackToTop />
    </main>
  );
}
