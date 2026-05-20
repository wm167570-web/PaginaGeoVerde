import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Search, Share2, X, ArrowUpRight, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import Tooltip from '../components/ui/Tooltip';
import Footer from '../components/Footer';
import extendedBlog from '../data/extendedBlog.json';
import { imageMap } from '../imageMap';

import { OptimizedImage } from '../components/ui/OptimizedImage';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800";

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePost, setActivePost] = useState<null | typeof extendedBlog[0]>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (postId: string) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  const postsPerPage = 9;

  const filteredPosts = useMemo(() => {
    setCurrentPage(1); // Reset to first page when searching
    return extendedBlog.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  const handleOpenArticle = (post: typeof extendedBlog[0]) => {
    const postSlug = (post as any).slug || post.id;
    window.history.pushState({}, '', `?post=${postSlug}`);
    setActivePost(post);
  };

  const handleCloseArticle = () => {
    window.history.pushState({}, '', window.location.pathname);
    setActivePost(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePost) {
        handleCloseArticle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const postSlug = searchParams.get('post');
    if (postSlug) {
      const post = extendedBlog.find(p => (p as any).slug === postSlug || String(p.id) === postSlug);
      if (post) {
        setActivePost(post);
      }
    }
  }, []);

  const handleShare = async (e: React.MouseEvent, post: typeof extendedBlog[0]) => {
    e.stopPropagation();
    
    const postSlug = (post as any).slug || post.id;
    const urlACompartir = `${window.location.origin}/?post=${postSlug}`;
    
    const shareData = {
      title: `${post.title} | GeoVerde`,
      text: post.excerpt,
      url: urlACompartir,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(urlACompartir);
        alert('Enlace copiado al portapapeles');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 flex items-center gap-4"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 group text-brand-primary font-bold text-xs uppercase tracking-[0.2em] hover:text-brand-secondary transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-brand-earth/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Volver al Inicio
            </Link>
            <span className="text-brand-primary/20">|</span>
            <Link 
              to="/#blog" 
              className="group inline-flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-[0.2em] hover:text-brand-secondary transition-all"
            >
              Blog Ambiental
            </Link>
          </motion.div>

          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
               Biblioteca GeoVerde
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl font-black italic text-brand-primary mb-8 tracking-tighter"
            >
              Artículos & <span className="not-italic font-light opacity-80">Conciencia</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto relative group"
            >
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-brand-forest group-focus-within:text-brand-primary transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="Buscar temas, noticias, soluciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-brand-earth/20 rounded-full py-5 pl-16 pr-8 shadow-xl shadow-brand-forest/5 focus:outline-none focus:border-brand-primary transition-all text-brand-primary font-medium placeholder:text-brand-forest/30"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index % 10 * 0.05 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-brand-earth/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage 
                      src={imageErrors[post.id] || !post.image ? FALLBACK_IMAGE : (imageMap[post.image] || post.image)} 
                      alt={`Infografía de ${post.title} - GeoVerde Vida Consciente`} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      onError={() => handleImageError(post.id)}
                      width={800}
                      height={450}
                      loading={index === 0 && currentPage === 1 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-forest/80 mb-4">
                       <Calendar className="w-3 h-3 text-brand-sky" aria-hidden="true" /> {post.date}
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-earth transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-brand-forest/70 line-clamp-3 mb-8 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-brand-earth/10 mt-auto">
                      <button 
                        onClick={() => handleOpenArticle(post)}
                        aria-label={`Leer artículo: ${post.title}`}
                        className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all hover:text-brand-sky"
                      >
                        Leer Artículo <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <Tooltip text="Compartir" position="left">
                        <button 
                          onClick={(e) => handleShare(e, post)}
                          aria-label={`Compartir artículo: ${post.title}`}
                          className="p-2 text-brand-forest/80 hover:text-brand-secondary transition-colors"
                        >
                          <Share2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full border-2 border-brand-earth/20 text-brand-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  // Only show current, first, last and surrounding pages if many
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                          currentPage === pageNumber
                            ? 'bg-brand-primary text-white scale-110 shadow-xl'
                            : 'bg-white text-brand-primary border-2 border-brand-earth/10 hover:border-brand-primary'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="text-brand-forest/40">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full border-2 border-brand-earth/20 text-brand-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-lg rotate-180"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {filteredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-brand-forest/60 font-serif text-2xl italic">No encontramos artículos para esa búsqueda...</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-brand-primary font-bold uppercase tracking-widest text-sm border-b-2 border-brand-secondary"
              >
                Ver todos los artículos
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modal View - Reused from BlogSection logic or we could create a standalone BlogModal component */}
      <AnimatePresence>
        {activePost && (
          <motion.div 
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${activePost.id}`}
          >
            <div
              onClick={handleCloseArticle}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-md"
              aria-hidden="true"
            />
            
            <motion.div
              layoutId={activePost.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
              role="document"
            >
              <button 
                onClick={handleCloseArticle}
                aria-label="Cerrar artículo"
                className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>

              <div className="md:w-1/2 relative h-64 md:h-auto">
                <OptimizedImage 
                  src={imageErrors[activePost.id] || !activePost.image ? FALLBACK_IMAGE : (imageMap[activePost.image] || activePost.image)} 
                  alt={`Infografía de ${activePost.title} - GeoVerde Vida Consciente`} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => handleImageError(activePost.id)}
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                   <h2 className="text-white font-serif text-3xl font-bold">{activePost.title}</h2>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto overscroll-contain scroll-smooth bg-brand-surface">
                <div className="hidden md:block mb-8">
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-forest/80 mb-4">
                    <span className="flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-brand-secondary" aria-hidden="true" /> {activePost.date}
                    </span>
                    <span className="flex items-center gap-2 uppercase">
                       <User className="w-3 h-3 text-brand-secondary" aria-hidden="true" /> GeoVerde
                    </span>
                  </div>
                  <h2 id={`dialog-title-${activePost.id}`} className="font-serif text-4xl font-bold text-brand-primary italic leading-[1.1]">
                    {activePost.title}
                  </h2>
                </div>

                <div className="prose prose-brand-primary max-w-none prose-p:text-brand-forest/80 prose-headings:text-brand-primary prose-strong:text-brand-primary">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <motion.p
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5 }}
                          {...(props as any)}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <motion.h3
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5 }}
                          {...(props as any)}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5 }}
                          {...(props as any)}
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <motion.img
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.5 }}
                          {...(props as any)}
                        />
                      )
                    }}
                  >
                    {activePost.content || activePost.excerpt}
                  </ReactMarkdown>
                </div>
                
                <div className="mt-12 pt-8 border-t border-brand-primary/10 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-forest/80">
                    GEOVERDE BLOG
                  </span>
                  <div className="flex gap-4 items-center">
                    <Link to="/" className="flex items-center gap-2 text-brand-secondary font-bold text-sm uppercase tracking-widest hover:text-brand-primary transition-colors">
                      ← Volver al Inicio
                    </Link>
                    <Link 
                      to="/#blog" 
                      className="flex items-center gap-1 text-sm font-medium hover:underline"
                      style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #ccc' }}
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
