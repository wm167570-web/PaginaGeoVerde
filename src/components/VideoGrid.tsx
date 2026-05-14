import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import content from '../data/content.json';

export default function VideoGrid() {
  return (
    <section id="videos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-forest opacity-50 mb-4">Lanzamientos Recientes</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-secondary italic">Explora Nuestra Videoteca</h3>
          </div>
          <p className="text-brand-forest/60 max-w-sm">
            Educación ambiental de alta calidad para entender el mundo en el que vivimos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-brand-earth">
                {/* Mock Thumbnail */}
                <div className="absolute inset-0 bg-brand-forest/10 group-hover:bg-brand-forest/0 transition-colors duration-500" />
                <img 
                  src={video.image || `https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=60&w=600&sig=${index}`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
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

              <h4 className="font-serif text-xl font-bold text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors">
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
            className="inline-flex items-center gap-2 text-brand-secondary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            Ver todos los videos en el canal
            <span className="h-[2px] w-12 bg-brand-secondary" />
          </a>
        </div>
      </div>
    </section>
  );
}
