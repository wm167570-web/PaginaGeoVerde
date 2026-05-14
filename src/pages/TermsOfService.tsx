import React from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import content from '../data/content.json';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-brand-earth font-sans antialiased text-brand-moss">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-32">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-brand-green font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al Inicio
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-brand-moss/5"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-12">Términos de Servicio</h1>
          
          <div className="prose prose-lg prose-slate max-w-none space-y-8 text-brand-moss/80">
            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">1. Aceptación de Términos</h2>
              <p>
                Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos de Servicio y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido utilizar o acceder a este sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">2. Licencia de Uso</h2>
              <p>
                Se concede permiso para descargar temporalmente una copia de los materiales (recursos, guías, etc.) en el sitio web de {content.channel.name} para visualización personal y no comercial solamente. Esta es la concesión de una licencia, no una transferencia de título.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">3. Descargo de Responsabilidad</h2>
              <p>
                Los materiales en el sitio web de {content.channel.name} se proporcionan "tal cual". {content.channel.name} no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluyendo, sin limitación, las garantías implícitas de comerciabilidad o idoneidad para un propósito particular.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">4. Limitaciones</h2>
              <p>
                En ningún caso {content.channel.name} o sus proveedores serán responsables de los daños que surjan del uso o la imposibilidad de usar los materiales en el sitio web, incluso si {content.channel.name} ha sido notificado de la posibilidad de tales daños.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">5. Propiedad Intelectual</h2>
              <p>
                Todo el contenido, videos, logotipos y materiales educativos son propiedad exclusiva de {content.channel.name} y están protegidos por las leyes de derechos de autor y propiedad intelectual vigentes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">6. Modificaciones</h2>
              <p>
                {content.channel.name} puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.
              </p>
            </section>

            <div className="pt-12 border-t border-brand-moss/10 mt-12 italic text-sm">
              Última actualización: 14 de Mayo, 2026
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
