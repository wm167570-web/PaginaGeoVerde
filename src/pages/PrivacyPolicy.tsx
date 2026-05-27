import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import content from '../data/content.json';
import { ArrowLeft, ShieldCheck, Lock, Eye, Server, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] font-sans antialiased text-gray-300 relative selection:bg-green-500/30">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      
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
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-green-600 via-green-400 to-transparent"></div>
          
          <header className="mb-16 border-b border-white/10 pb-12">
            <div className="w-16 h-16 bg-green-500/10 flex items-center justify-center rounded-2xl mb-8 border border-green-500/20">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-white tracking-tight leading-tight">Política de Privacidad y Manejo de Datos</h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
              Nuestra entidad adopta los más altos estándares internacionales para el tratamiento, recolección y custodia de la información personal de nuestros usuarios, en pleno cumplimiento de marcos normativos de protección de datos (GDPR / CCPA).
            </p>
          </header>
          
          <div className="space-y-14 text-sm md:text-base leading-relaxed">
            
            <section>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <Eye className="w-5 h-5 text-green-500" />
                1. Recolección Sistemática de Información
              </h2>
              <div className="pl-8 text-gray-400 border-l border-white/10 space-y-4">
                <p>Las interacciones a través de la interfaz de usuario, especialmente mediante formularios de contacto explícitos o registros voluntarios, desencadenan la captura de metadatos calificados y PII (Personally Identificable Information). Esto incluye de forma no taxativa: identificadores onomásticos, direcciones de enrutamiento electrónico (emails) y el cuerpo textual de las comunicaciones suministradas de forma consciente.</p>
                <p>No empleamos técnicas de scraping furtivo ni recolección de espectro amplio sin el previo consentimiento afirmativo del interesado. Las métricas de análisis en la plataforma son pseudonimizadas de origen.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <Server className="w-5 h-5 text-green-500" />
                2. Vectorización y Tratamiento del Dato
              </h2>
              <div className="pl-8 text-gray-400 border-l border-white/10 space-y-4">
                <p>El núcleo de nuestro procesamiento está orientado estrictamente hacia objetivos operativos: provisión de respuestas especializadas ante requerimientos técnicos, despacho opt-in de boletines ambientales, y monitoreo de las iteraciones de UX/UI para su optimización funcional.</p>
                <p>Cualquier uso que diverja tangencialmente de estos propósitos demandará una re-validación del consentimiento a través de confirmación por doble factor (Double Opt-in) por parte del titular del dato.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-green-500" />
                3. Custodia y Arquitectura de Seguridad
              </h2>
              <div className="pl-8 text-gray-400 border-l border-white/10 space-y-4">
                <p>Implementamos heurísticas de control de acceso lógico, tráfico cifrado end-to-end bajo protocolos TLS 1.3, y segregación de bases de datos. Mitigamos vectores de ataque comunes preservando la integridad de las bóvedas de datos frente a vulneraciones a nivel de red, aplicación y acceso físico.</p>
                <p>Renunciamos expresamente a la comercialización, arrendamiento o exposición de bases de datos hacia estructuras de terceros ("third-party brokers") bajo cualquier modalidad.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-green-500" />
                4. Soberanía del Titular (Derechos ARCO)
              </h2>
              <div className="pl-8 text-gray-400 border-l border-white/10 space-y-4">
                <p>Consolidamos su señorío sobre la propia información. Como titular legítimo, usted retiene plenas facultades para tramitar peticiones de <strong>Acceso, Rectificación, Cancelación u Oposición</strong> (Derecho al Olvido). Este proceso podrá tramitarse directamente elevando un requerimiento formal al Oficial de Privacidad en <span className="text-white">info@geoverdevidaconsciente.com</span>.</p>
                <p>Toda solicitud se procesará mediante trazabilidad comprobable dentro de un periodo restrictivo de 15 días hábiles operativos.</p>
              </div>
            </section>

          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Política sujeta a auditoría programada</span>
            </div>
            <span>Revisión de Cumplimiento: Octubre 23, 2026</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
