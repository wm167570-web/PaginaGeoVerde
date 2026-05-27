import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import content from '../data/content.json';
import { ArrowLeft, Shield, Scale, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased text-gray-300 relative selection:bg-green-500/30">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-green-500 font-medium mb-12 hover:gap-3 transition-all text-sm tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-400 to-transparent"></div>
          
          <header className="mb-16 border-b border-white/10 pb-12">
            <div className="w-16 h-16 bg-green-500/10 flex items-center justify-center rounded-2xl mb-8 border border-green-500/20">
              <Scale className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-white tracking-tight leading-tight">Términos y Condiciones de Servicio</h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
              Al utilizar las plataformas, recursos y canales de {content.channel.name}, usted acepta las siguientes normativas rectoras. Lea detenidamente estas disposiciones legales que rigen nuestra relación.
            </p>
          </header>
          
          <div className="space-y-12 text-sm md:text-base leading-relaxed">
            
            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors">
                  <span className="text-green-500 font-mono text-xs">01</span>
                </div>
                <h2 className="text-xl font-medium text-white tracking-wide">Marco Regulatorio y Aceptación</h2>
              </div>
              <div className="pl-12 text-gray-400 space-y-4">
                <p>El acceso, navegación y utilización del presente ecosistema digital, así como la consulta de la información audiovisual disponible en los canales oficiales vinculados a {content.channel.name}, constituye la aceptación expresa, irrefutable e incondicional de los presentes Términos de Servicio. La negativa a sujetarse a este marco normativo implica la inmediata restricción de uso y acceso.</p>
                <p>Este marco rige todo el contenido intelectual, interacciones, recopilación de datos de contacto y participación en las iniciativas ambientales presentadas, estableciendo un pacto vinculante entre el usuario visitante y los administradores.</p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors">
                  <span className="text-green-500 font-mono text-xs">02</span>
                </div>
                <h2 className="text-xl font-medium text-white tracking-wide">Derechos de Propiedad Intelectual</h2>
              </div>
              <div className="pl-12 text-gray-400 space-y-4">
                <p>Todo material, obra audiovisual, artículos, bases de datos subyacentes, logotipos, marcas comerciales y diseño de interfaces exhibidos en esta plataforma y en nuestros canales complementarios son de titularidad exclusiva de {content.channel.name} o de sus respectivos licenciantes, estando custodiados bajo el rigor de las leyes internacionales de CopyRight y Propiedad Industrial.</p>
                <p>Se prohíbe categóricamente la reproducción sistemática, alteración, distribución con fines de lucro, ingeniería inversa o cualquier forma de explotación comercial de los contenidos sin el previo y explícito consentimiento por escrito de nuestra entidad corporativa.</p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors">
                  <span className="text-green-500 font-mono text-xs">03</span>
                </div>
                <h2 className="text-xl font-medium text-white tracking-wide">Exención de Responsabilidad</h2>
              </div>
              <div className="pl-12 text-gray-400 space-y-4">
                <p>La información medioambiental y recomendaciones técnicas provistas tienen un carácter estrictamente educativo e informativo. Si bien nos esforzamos por asegurar la precisión científica y actualidad de los datos, {content.channel.name} no se responsabiliza por malas prácticas, decisiones técnicas erróneas o contingencias resultantes de la aplicación directa de dichos consejos por cuenta y riesgo del usuario.</p>
                <p>Nuestra plataforma y red digital se proveen "tal cual" (as is) y "según disponibilidad", rechazando expresamente toda garantía de idoneidad, precisión ininterrumpida o blindaje contra brechas cibernéticas de terceros.</p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors">
                  <span className="text-green-500 font-mono text-xs">04</span>
                </div>
                <h2 className="text-xl font-medium text-white tracking-wide">Normas de Involucramiento</h2>
              </div>
              <div className="pl-12 text-gray-400 space-y-4">
                <p>El uso de nuestros formularios de contacto o canales de comunicación impone al usuario la obligación legal de proporcionar datos auténticos, no difamatorios y libres de código malicioso. Nos reservamos de manera indelegable el derecho de admisión, veto, bloqueo o reporte de usuarios ante las autoridades competentes en caso de detectar injurias, sabotaje informático ("spam/phishing") o infracciones graves.</p>
              </div>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-green-500/30 transition-colors">
                  <span className="text-green-500 font-mono text-xs">05</span>
                </div>
                <h2 className="text-xl font-medium text-white tracking-wide">Tribunales y Enmiendas</h2>
              </div>
              <div className="pl-12 text-gray-400 space-y-4">
                <p>Cualquier disputa técnica o litigio derivado de la interpretación de este articulado se someterá a mediación previa obligatoria, sujeta al marco jurisdiccional de los tribunales de competencia general, priorizando el lugar de registro principal de las operaciones de {content.channel.name}.</p>
                <p>Nos adjudicamos la facultad discrecional de enmendar, añadir o suprimir cláusulas de este Tratado mediante publicación actualizada en este mismo directorio. Es responsabilidad inherente del usuario revisar esta documentación de forma periódica.</p>
              </div>
            </section>

          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Documento Legal Vinculante</span>
            </div>
            <span>Última revisión: Octubre 23, 2026 // v2.0.4</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
