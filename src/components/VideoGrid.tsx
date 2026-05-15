import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import content from '../data/content.json';
import { OptimizedImage } from './ui/OptimizedImage';

export default function VideoGrid() {
  return (
    <section id="videos" className="py-24 bg-white relative overflow-hidden border-b border-brand-earth/10">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" 
          alt="Environmental Background" 
          className="w-full h-full object-cover grayscale"
          width={1920}
          height={1080}
          loading="lazy"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-brand-sky mb-4">Lanzamientos</h2>
            <h3 className="font-serif text-4xl md:text-7xl font-black text-brand-primary italic leading-[0.9] tracking-tighter">Explora <span className="not-italic font-light opacity-80">Nuestra Videoteca</span></h3>
          </div>
          <p className="text-brand-forest/60 max-w-sm border-l-2 border-brand-secondary pl-4 text-sm md:text-base font-light leading-relaxed">
            Educación ambiental de alta calidad para entender el mundo en el que vivimos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.featuredVideos.map((video, index) => (
            <motion.a
              key={video.id}
              href={video.url || "https://www.youtube.com/playlist?list=PLgg4No7_afp0hlOqZOfERROG4vJub12Rs"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-brand-light-green/20">
                {/* Mock Thumbnail */}
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                <OptimizedImage 
                  src={video.image || "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d"}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width={600}
                  height={340}
                  loading="lazy"
                />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-brand-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                  12:45
                </div>
              </div>

              <h4 className="font-serif text-2xl font-bold text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors leading-tight">
                {video.title}
              </h4>
              <p className="text-sm text-brand-forest/70 line-clamp-2">
                {video.description}
              </p>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href={content.channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            Ver todos los videos en el canal
            <span className="h-[2px] w-12 bg-brand-secondary" />
          </a>
        </div>
      </div>
    </section>
  );
}
