import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, Youtube } from 'lucide-react';
import { useState } from 'react';
import content from '../data/content.json';
import { OptimizedImage } from './ui/OptimizedImage';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'El nombre es obligatorio';
      else if (value.trim().length < 3) error = 'El nombre debe tener al menos 3 caracteres';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'El correo es obligatorio';
      else if (!emailRegex.test(value)) error = 'Formato de correo no válido';
    }
    if (name === 'message') {
      if (!value.trim()) error = 'El mensaje no puede estar vacío';
      else if (value.trim().length < 10) error = 'El mensaje debe ser más descriptivo (mín. 10 caracteres)';
    }
    return error;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (touched[id as keyof typeof touched]) {
      const error = validateField(id, value);
      setErrors(prev => ({ ...prev, [id]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched and validate
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.values(newErrors).some(err => err)) return;

    setIsSubmitting(true);
    setErrors({ name: '', email: '', message: '' }); 
    setFormError(null); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "da7aaf70-8afe-4fa4-aca6-76b555bb76e3",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Nuevo contacto desde GeoVerde",
          from_name: "Sitio Web GeoVerde",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' }); 
      } else {
        throw new Error(data.message || "Algo salió mal al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);
      setFormError(error instanceof Error ? error.message : "Error desconocido al enviar el mensaje.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 relative overflow-hidden transition-colors duration-500">
      {/* Background Image Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" 
          alt="Contact Background" 
          className="w-full h-full object-cover grayscale brightness-50"
          width={1920}
          height={1080}
          loading="lazy"
        />
      </div>

      {/* Abstract background elements - Magnific style */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-brand-primary mb-6">Contacto</h2>
            <h3 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black text-white italic mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">
              ¿Tienes un <span className="text-white not-italic font-light opacity-80">proyecto ecológico?</span> <span className="text-brand-primary not-italic font-sans font-extralight block mt-4">Hablemos.</span>
            </h3>
            
            <div className="space-y-10 mt-12">
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300">
                  <Mail className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 block">Email</span>
                  <a 
                    href={`mailto:info@geoverdevidaconsciente.com,gerencia@geoverdevidaconsciente.com`}
                    className="text-sm sm:text-base md:text-lg font-medium text-white hover:text-brand-primary transition-colors cursor-pointer block break-all sm:break-words"
                  >
                    info@geoverdevidaconsciente.com <br />
                    gerencia@geoverdevidaconsciente.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300">
                  <Youtube className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 block">Comunidad</span>
                  <a 
                    href={content.channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-xl font-medium text-white hover:text-brand-primary transition-colors block break-words"
                  >
                    {content.channel.handle}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] p-6 sm:p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full overflow-hidden"
          >
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                <div className="space-y-3 relative">
                  <div className="flex justify-between items-center px-1">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nombre Completo</label>
                    {touched.name && errors.name && (
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">{errors.name}</span>
                    )}
                  </div>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="Tu nombre aquí..."
                    aria-invalid={!!errors.name}
                    className={`w-full bg-white/5 border px-5 md:px-8 py-4 md:py-5 focus:outline-none transition-all text-white placeholder:text-white/20 font-medium rounded-2xl ${
                      touched.name && errors.name 
                        ? 'border-red-500/50 bg-red-500/5' 
                        : touched.name && !errors.name 
                        ? 'border-brand-secondary/50 bg-brand-secondary/5'
                        : 'border-white/10 focus:border-brand-primary/50 focus:bg-white/10'
                    }`}
                  />
                </div>
                
                <div className="space-y-3 relative">
                  <div className="flex justify-between items-center px-1">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Correo Electrónico</label>
                    {touched.email && errors.email && (
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">{errors.email}</span>
                    )}
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    placeholder="tucorreo@dominio.com"
                    aria-invalid={!!errors.email}
                    className={`w-full bg-white/5 border px-5 md:px-8 py-4 md:py-5 focus:outline-none transition-all text-white placeholder:text-white/20 font-medium rounded-2xl ${
                      touched.email && errors.email 
                        ? 'border-red-500/50 bg-red-500/5' 
                        : touched.email && !errors.email 
                        ? 'border-brand-secondary/50 bg-brand-secondary/5'
                        : 'border-white/10 focus:border-brand-primary/50 focus:bg-white/10'
                    }`}
                  />
                </div>

                <div className="space-y-3 relative">
                  <div className="flex justify-between items-center px-1">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mensaje</label>
                    {touched.message && errors.message && (
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">{errors.message}</span>
                    )}
                  </div>
                  <textarea 
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="¿En qué podemos ayudarte?"
                    aria-invalid={!!errors.message}
                    className={`w-full bg-white/5 border px-5 md:px-8 py-4 md:py-5 focus:outline-none transition-all text-white placeholder:text-white/20 font-medium resize-none rounded-2xl ${
                      touched.message && errors.message 
                        ? 'border-red-500/50 bg-red-500/5' 
                        : touched.message && !errors.message 
                        ? 'border-brand-secondary/50 bg-brand-secondary/5'
                        : 'border-white/10 focus:border-brand-primary/50 focus:bg-white/10'
                    }`}
                  />
                </div>
                
                 
                 {(formError || errors.name || errors.email || errors.message) && (
                   <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter text-center mt-2">
                     {formError || "Por favor, corrige los errores del formulario."}
                   </p>
                 )}
                 <button 
                   disabled={isSubmitting}
                   className="w-full group flex items-center justify-center gap-3 bg-[#F5F5F5] text-[#1A1A1A] py-6 rounded-full font-bold transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-4 disabled:cursor-not-allowed shadow-xl shadow-black/20"
                 >
                  <span className="text-sm uppercase tracking-widest">
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </span>
                  {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-primary/30">
                  <Send className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-3xl font-bold text-white mb-4 italic">¡Mensaje Enviado!</h4>
                <p className="text-white/60 text-lg">Gracias por contactarnos. Te responderemos muy pronto.</p>
                <button 
                  onClick={() => setIsSent(false)}
                  className="mt-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
