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
const FALLBACK_IMAGE = "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg";

export default function BlogListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePost, setActivePost] = useState<null | typeof extendedBlog[0]>(null);

  const postsPerPage = 8;

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
    <div className="min-h-screen bg-slate-50" id="blog-listing">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
        #blog-listing * {
            font-family: 'Poppins', sans-serif;
        }
      `}} />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 flex items-center justify-center gap-4"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 group text-slate-600 font-medium text-sm hover:text-slate-900 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver al Inicio
            </Link>
          </motion.div>

          <div className="mb-10 text-center">
            <div className="inline-flex flex-col gap-3 items-center w-full max-w-2xl px-4">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Blog de Noticias
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-slate-500">
                Encuentra exactamente lo que buscas en nuestras colecciones de artículos, noticias y ecología.
              </p>
              <div className="mt-4 flex items-center mx-auto border pl-4 gap-2 bg-white border-slate-200 h-[46px] rounded-full overflow-hidden w-full shadow-sm">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input 
                  type="text"
                  placeholder="Buscar temas, noticias, soluciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-full outline-none text-sm text-slate-600 placeholder:text-slate-400 bg-transparent"
                />
                <button type="submit" className="bg-slate-900 hover:bg-slate-800 transition flex-shrink-0 w-24 h-9 rounded-full text-sm font-medium text-white mr-[3.5px]">
                    Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {paginatedPosts.map((post, index) => {
                return (
                  <motion.button
                    key={post.id}
                    onClick={() => handleOpenArticle(post)}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index % 8 * 0.05 }}
                    className="group relative block aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-2xl w-full text-left bg-slate-900 shadow-sm hover:shadow-xl transition-shadow duration-500"
                  >
                    <img 
                      alt={post.title} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                      src={post.image || FALLBACK_IMAGE}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 transition-opacity duration-500 md:group-hover:opacity-70"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-3 opacity-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                           <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-semibold text-white tracking-widest uppercase">
                             Noticia
                           </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white leading-snug drop-shadow-md mb-2 line-clamp-3 md:line-clamp-4">{post.title}</h3>
                        <p className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-500">
                          Leer Artículo <ArrowUpRight className="w-4 h-4"/>
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full border border-slate-200 text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 hover:text-white transition-all shadow-sm"
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
                        className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
                          currentPage === pageNumber
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
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
                    return <span key={pageNumber} className="text-slate-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full border border-slate-200 text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-900 hover:text-white transition-all shadow-sm rotate-180"
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
              <p className="text-slate-500 text-lg">No encontramos artículos para esa búsqueda...</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 text-slate-900 font-semibold text-sm hover:underline"
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
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
              role="document"
            >
              <button 
                onClick={handleCloseArticle}
                aria-label="Cerrar artículo"
                className="absolute top-6 right-6 z-20 p-2 bg-white backdrop-blur-md rounded-full text-slate-900 border border-slate-200 hover:bg-slate-100 transition-all shadow-md focus:outline-none"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>

              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[400px] flex-shrink-0">
                <img 
                  src={activePost.image || FALLBACK_IMAGE} 
                  alt={activePost.title} 
                  loading="eager"
                  decoding="sync"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                  onLoad={() => console.log("Image loaded successfully")}
                  onError={(e) => {
                    console.error("Image failed to load, falling back:", e);
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8 md:hidden">
                   <h2 className="text-white text-3xl font-semibold leading-tight">{activePost.title}</h2>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto overscroll-contain scroll-smooth bg-white">
                <div className="hidden md:block mb-8">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                       <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {activePost.date}
                    </span>
                    <span className="flex items-center gap-1">
                       <User className="w-3.5 h-3.5" aria-hidden="true" /> GeoVerde
                    </span>
                  </div>
                  <h2 id={`dialog-title-${activePost.id}`} className="text-3xl font-semibold text-slate-900 leading-tight">
                    {activePost.title}
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-slate-900 prose-strong:text-slate-900">
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
                
                <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    GEOVERDE BLOG
                  </span>
                  <div className="flex gap-4 items-center">
                    <button 
                      onClick={(e) => handleShare(e, activePost)}
                      className="flex items-center gap-2 text-slate-600 font-medium text-sm hover:text-slate-900 transition-colors"
                    >
                      <Share2 className="w-4 h-4" /> Compartir
                    </button>
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
