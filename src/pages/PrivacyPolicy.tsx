import React from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import content from '../data/content.json';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-12">Política de Privacidad</h1>
          
          <div className="prose prose-lg prose-slate max-w-none space-y-8 text-brand-moss/80">
            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">1. Introducción</h2>
              <p>
                En {content.channel.name}, valoramos su privacidad y estamos comprometidos a proteger sus datos personales. Esta política explica cómo manejamos la información cuando visita nuestro sitio web y utiliza nuestro formulario de contacto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">2. Información que Recopilamos</h2>
              <p>
                Recopilamos información que usted nos proporciona voluntariamente a través del formulario de contacto, incluyendo su nombre, dirección de correo electrónico y cualquier mensaje que decida enviarnos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">3. Uso de la Información</h2>
              <p>
                La información recopilada se utiliza exclusivamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Responder a sus consultas y mensajes.</li>
                <li>Enviar boletines informativos (solo si se suscribe explícitamente).</li>
                <li>Mejorar nuestros contenidos y recursos educativos.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">4. Protección de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la pérdida o la alteración.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">5. Sus Derechos</h2>
              <p>
                Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento. Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de {content.channel.email}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-green mb-4">6. Cookies</h2>
              <p>
                Utilizamos cookies mínimas para mejorar su experiencia de navegación. Puede configurar su navegador para rechazar todas las cookies si lo desea.
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
