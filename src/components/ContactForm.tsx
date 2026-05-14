import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, Youtube } from 'lucide-react';
import { useState } from 'react';
import content from '../data/content.json';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct mailto link
    const subject = encodeURIComponent(`Nuevo mensaje de ${formData.name} via GeoVerde`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Mensaje:\n${formData.message}`
    );
    
    const mailtoUrl = `mailto:${content.channel.email}?subject=${subject}&body=${body}`;

    // Simulate API call and open mailto
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-sky/10 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-forest opacity-50 mb-4">Contacto</h2>
            <h3 className="font-serif text-4xl md:text-6xl font-bold text-brand-secondary italic mb-8">
              ¿Tienes un proyecto ecológico? <span className="text-brand-forest not-italic font-sans font-light">Hablemos.</span>
            </h3>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-earth flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-forest opacity-60">Email</span>
                  <a 
                    href={`mailto:${content.channel.email}`}
                    className="text-lg font-medium text-brand-primary cursor-pointer hover:underline block"
                  >
                    {content.channel.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-earth flex items-center justify-center flex-shrink-0">
                  <Youtube className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-forest opacity-60">Comunidad</span>
                  <a 
                    href={content.channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-brand-primary hover:underline block"
                  >
                    {content.channel.handle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-earth p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-brand-primary/5">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-brand-forest">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre aquí..."
                    className="w-full bg-white border-b border-brand-forest/10 px-4 py-4 focus:outline-none focus:border-brand-secondary transition-colors font-medium rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-brand-forest">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tucorreo@dominio.com"
                    className="w-full bg-white border-b border-brand-forest/10 px-4 py-4 focus:outline-none focus:border-brand-secondary transition-colors font-medium rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-brand-forest">Mensaje</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-white border-b border-brand-forest/10 px-4 py-4 focus:outline-none focus:border-brand-secondary transition-colors font-medium resize-none rounded-xl"
                  />
                </div>
                
                <button 
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center gap-3 bg-brand-primary text-white py-6 rounded-3xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-3xl font-bold text-brand-primary mb-4">¡Mensaje Enviado!</h4>
                <p className="text-brand-forest/70">Gracias por contactarnos. Te responderemos muy pronto.</p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="mt-8 text-brand-primary font-bold uppercase tracking-widest text-sm hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
