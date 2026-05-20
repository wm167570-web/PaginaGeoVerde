import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowUpRight, Share2 } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';
import Tooltip from './ui/Tooltip';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800";

interface BlogArticleCardProps {
  post: any;
  index: number;
  setActivePost: (post: any) => void;
  handleShare: (e: React.MouseEvent, post: any) => void;
}

export function BlogArticleCard({ post, index, setActivePost, handleShare }: BlogArticleCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative bg-white/60 backdrop-blur-sm p-6 md:p-12 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8"
    >
      <div className="absolute top-0 right-0 p-8 font-serif text-9xl font-bold text-brand-sky/5 italic pointer-events-none group-hover:scale-110 transition-transform duration-1000">
        {index + 1}
      </div>

      <div className="md:w-1/3 h-64 md:h-auto rounded-3xl overflow-hidden shadow-inner">
        <OptimizedImage
          src={imageError || !post.image ? FALLBACK_IMAGE : post.image}
          alt={`Infografía de ${post.title} - GeoVerde Vida Consciente`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          width={800}
          height={450}
          priority={index < 6}
          decoding="async"
          onError={(e) => {
            setImageError(true);
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      <div className="relative z-10 md:w-2/3 flex flex-col">
        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-forest/80 mb-6 font-sans">
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
        <p className="max-w-prose text-[17px] leading-[1.75] text-brand-forest/70 group-hover:text-brand-forest transition-colors mb-8 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-primary/5">
          <button
            onClick={() => setActivePost(post)}
            aria-label={`Leer más sobre ${post.title}`}
            className="flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-widest transition-all hover:text-brand-secondary"
          >
            Leer Más <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <Tooltip text="Compartir artículo" position="left">
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
  );
}
