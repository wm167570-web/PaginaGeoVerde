import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { useRef } from 'react';

export default function ViveConsciente() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="relative font-sans antialiased bg-brand-surface min-h-screen" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section of the Article */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yBackground }}
        >
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Naturaleza y Conciencia" 
            className="w-full h-full object-cover brightness-[0.6]"
            width={1920}
            height={1080}
            priority={true}
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/90 backdrop-blur-sm text-brand-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
              Nuestra Filosofía
            </div>
            <h1 className="font-serif text-5xl md:text-8xl font-black italic text-white leading-tight mb-6 drop-shadow-lg">
              Vive Consciente
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Más que un lema, es una respuesta estratégica a un mundo donde la economía lineal ha llegado a su límite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Text Section */}
      <section className="py-24 md:py-32 bg-white relative z-20 -mt-8 rounded-t-[3rem] shadow-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-forest hover:text-brand-primary transition-colors font-bold text-sm uppercase tracking-widest mb-16 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          
          <div className="prose prose-lg md:prose-xl prose-brand-primary max-w-none text-brand-forest/80 leading-[1.8] font-light">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-serif text-brand-primary leading-relaxed mb-12"
            >
              Vivimos en un punto de inflexión histórico. El modelo tradicional de extraer, producir y desechar ya no es viable. Ser conscientes no es un ideal romántico; es la estrategia más inteligente para la supervivencia y el éxito en el siglo XXI.
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-12 items-center my-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-6">El Fin de la Economía Lineal</h2>
                <p>
                  Nuestros sistemas económicos fueron diseñados asumiendo recursos infinitos. Hoy, la realidad nos demuestra que este modelo está obsoleto. La transición a una economía circular no es opcional, es una reestructuración fundamental de cómo creamos valor.
                </p>
                <p>
                  "Vive Consciente" significa entender esta transformación. Significa ver más allá del corto plazo e incorporar el impacto ambiental y social en cada decisión.
                </p>
              </motion.div>
              <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                 <OptimizedImage 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
                  alt="Economía y Naturaleza"
                  className="w-full h-full object-cover"
                  width={600}
                  height={800}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center my-20 flex-col-reverse md:flex-row-reverse relative">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="md:pl-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-6">Liderazgo Estratégico</h2>
                <p>
                  Ser un líder profesional moderno implica una gestión integral. No entendemos el medio ambiente como un concepto aislado, sino como el territorio mismo donde ocurren los negocios y la vida.
                </p>
                <p>
                  La sustentabilidad ha pasado de ser un área de responsabilidad corporativa a ser el núcleo central de la innovación y la rentabilidad. "Vive Consciente" es un llamado a elevar el nivel, a tomar decisiones con propósito y a diseñar sistemas que regeneran nuestro entorno, no que lo agotan.
                </p>
              </motion.div>
              <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl order-last md:order-first">
                 <OptimizedImage 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
                  alt="Liderazgo y Conciencia"
                  className="w-full h-full object-cover"
                  width={600}
                  height={800}
                />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-24 p-12 bg-[#F9F8F3] rounded-[2.5rem] border border-brand-earth/10 text-center"
            >
              <h3 className="font-serif text-3xl font-bold text-brand-primary italic mb-6">El futuro pertenece a quienes entienden el sistema completo.</h3>
              <p className="text-xl">
                Únete a nosotros. Seamos el puente entre la técnica y la conciencia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
