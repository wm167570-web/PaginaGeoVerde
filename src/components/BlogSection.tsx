import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowUpRight, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import content from '../data/content.json';

export default function BlogSection() {
  const [activePost, setActivePost] = useState<null | typeof content.blog[0]>(null);

  return (
    <section id="blog" className="py-24 bg-brand-earth">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-moss opacity-50 mb-4">Blog Ambiental</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-green italic leading-[1.1] mb-8">
              Artículos & Noticias Verdes
            </h3>
            <p className="text-brand-moss/70 mb-10 text-lg">
              Profundizamos en los temas que importan hoy para proteger el mañana.
            </p>
            <a 
              href="https://es.wired.com/ciencia/medio-ambiente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-moss text-white px-8 py-4 rounded-full font-bold hover:bg-brand-moss/90 transition-all text-center"
            >
              Ver Todos los Artículos
            </a>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-12">
            {content.blog.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Background decorative text */}
                <div className="absolute top-0 right-0 p-8 font-serif text-9xl font-bold text-brand-green/5 italic pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  {index + 1}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-moss/60 mb-6 font-sans">
                    <span className="flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-brand-green" /> {post.date}
                    </span>
                    <span className="flex items-center gap-2 uppercase">
                       <User className="w-3 h-3 text-brand-green" /> GeoVerde
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-brand-green mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {post.title}
                  </h4>
                  <p className="text-brand-moss/70 leading-relaxed max-w-xl group-hover:text-brand-moss transition-colors mb-8">
                    {post.excerpt}
                  </p>

                  <button 
                    onClick={() => setActivePost(post)}
                    className="flex items-center gap-2 text-brand-green font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all hover:text-brand-moss"
                  >
                    Leer Más <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="absolute inset-0 bg-brand-green/40 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={activePost.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setActivePost(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img 
                  src={activePost.image} 
                  alt={activePost.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                   <h2 className="text-white font-serif text-3xl font-bold">{activePost.title}</h2>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-brand-earth/30">
                <div className="hidden md:block mb-8">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-moss/60 mb-4">
                    <span className="flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-brand-green" /> {activePost.date}
                    </span>
                    <span className="flex items-center gap-2 uppercase">
                       <User className="w-3 h-3 text-brand-green" /> GeoVerde
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl font-bold text-brand-green italic leading-[1.1]">
                    {activePost.title}
                  </h2>
                </div>

                <div className="prose prose-brand-green max-w-none prose-p:text-brand-moss/80 prose-headings:text-brand-green prose-strong:text-brand-green">
                  <ReactMarkdown>{activePost.content}</ReactMarkdown>
                </div>
                
                <div className="mt-12 pt-8 border-t border-brand-green/10 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-moss/40">
                    GEOVERDE BLOG
                  </span>
                  <button 
                    onClick={() => setActivePost(null)}
                    className="text-brand-green font-bold text-sm uppercase tracking-widest hover:text-brand-moss transition-colors"
                  >
                    Volver al Inicio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
