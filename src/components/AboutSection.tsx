import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 md:py-32 bg-[#F9F8F3] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1A14] mb-12">
            Nuestra Esencia
          </h2>
          
          <div className="font-sans text-lg md:text-xl text-[#0B1A14]/80 leading-[1.8] font-light max-w-3xl mx-auto">
            <p className="mb-6">
              <strong className="font-serif font-bold text-2xl md:text-3xl text-[#0B1A14] mr-1">GeoVerde Vida Consciente</strong> 
              nació el 20 de diciembre de 2024
            </p>
            
            <div className="flex items-center justify-center gap-6 my-10" aria-hidden="true">
              <div className="h-[1px] w-20 md:w-32 bg-[#0B1A14]/15" />
              <Leaf className="w-6 h-6 text-brand-primary" />
              <div className="h-[1px] w-20 md:w-32 bg-[#0B1A14]/15" />
            </div>
            
            <p className="mb-6">
              con la misión de llevar la educación y la conciencia ambiental de manera integral. No entendemos el medio ambiente como un concepto aislado, sino como un sistema vivo donde lo biológico, lo social y lo técnico se entrelazan.
            </p>
            <p className="mb-6">
              <span className="font-serif italic font-medium text-xl md:text-2xl text-[#0B1A14]">
                Creemos en una visión holística: comprender las dinámicas de la naturaleza es entender cómo interactúan nuestros propios sistemas de vida.
              </span>
            </p>
            <p>
              Somos el puente entre la técnica y la conciencia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
