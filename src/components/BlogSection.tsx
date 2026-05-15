import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowUpRight, X, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Logo from './Logo';
import Tooltip from './ui/Tooltip';
import content from '../data/content.json';

export default function BlogSection() {
  const [activePost, setActivePost] = useState<null | typeof content.blog[0]>(null);

  const handleShare = async (e: React.MouseEvent, post: typeof content.blog[0]) => {
    e.stopPropagation();
    const shareData = {
      title: `${post.title} | GeoVerde`,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  return (
    <section id="blog" className="py-24 bg-brand-light-green/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-earth/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-brand-primary/60 mb-4">Blog Ambiental</h2>
            <h3 className="font-serif text-5xl md:text-7xl font-black text-brand-primary italic leading-[0.9] mb-8 tracking-tighter">
              Artículos & <span className="not-italic font-light opacity-80">Noticias Verdes</span>
            </h3>
            <p className="text-brand-forest/70 mb-10 text-base md:text-lg border-b-2 border-brand-sky pb-6 inline-block font-light leading-relaxed">
              Profundizamos en los temas que importan hoy para proteger el mañana.
            </p>
            <Link 
              to="/blog"
              className="inline-block bg-brand-earth text-white px-8 py-4 rounded-full font-bold hover:bg-brand-primary transition-all text-center shadow-lg shadow-brand-earth/20"
            >
              Ver Todos los Artículos
            </Link>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-12">
            {content.blog.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 overflow-hidden"
              >
                {/* Background decorative text */}
                <div className="absolute top-0 right-0 p-8 font-serif text-9xl font-bold text-brand-sky/5 italic pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  {index + 1}
                </div>

                {/* Subtile background Logo watermark */}
                <div className="absolute -bottom-16 -right-16 w-80 h-80 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000 pointer-events-none">
                  <Logo className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 mb-6 font-sans">
                    <span className="flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-brand-sky" /> {post.date}
                    </span>
                    <span className="flex items-center gap-2 uppercase">
                       <User className="w-3 h-3 text-brand-secondary" /> GeoVerde
                    </span>
                  </div>

                  <h4 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-6 group-hover:text-brand-earth transition-colors duration-500 leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-brand-forest/70 leading-relaxed max-w-xl group-hover:text-brand-forest transition-colors mb-8">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <button 
                      onClick={() => setActivePost(post)}
                      className="flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all hover:text-brand-sky"
                    >
                      Leer Más <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <Tooltip text="Compartir artículo" position="left">
                      <button 
                        onClick={(e) => handleShare(e, post)}
                        className="p-2 text-brand-forest/40 hover:text-brand-secondary transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </div>
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
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-md"
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
                className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-lg"
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
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                   <h2 className="text-white font-serif text-3xl font-bold">{activePost.title}</h2>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-brand-earth/30">
                <div className="hidden md:block mb-8">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-forest/60 mb-4">
                    <span className="flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-brand-secondary" /> {activePost.date}
                    </span>
                    <span className="flex items-center gap-2 uppercase">
                       <User className="w-3 h-3 text-brand-secondary" /> GeoVerde
                    </span>
                  </div>
                  <h2 className="font-serif text-4xl font-bold text-brand-primary italic leading-[1.1]">
                    {activePost.title}
                  </h2>
                </div>

                <div className="prose prose-brand-primary max-w-none prose-p:text-brand-forest/80 prose-headings:text-brand-primary prose-strong:text-brand-primary">
                  <ReactMarkdown>{activePost.content}</ReactMarkdown>
                </div>
                
                <div className="mt-12 pt-8 border-t border-brand-primary/10 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-forest/40">
                    GEOVERDE BLOG
                  </span>
                  <button 
                    onClick={() => setActivePost(null)}
                    className="text-brand-secondary font-bold text-sm uppercase tracking-widest hover:text-brand-primary transition-colors"
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
