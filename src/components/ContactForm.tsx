import { motion } from 'motion/react';
import { Send, MapPin, Mail, Phone, Youtube } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <section id="contact" className="relative bg-black flex flex-col md:flex-row justify-center px-4 py-20 gap-20 overflow-hidden font-sans">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-green-500/20 rounded-full blur-[150px] md:blur-[200px] z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-center md:text-left mt-12 relative z-10"
      >
        <div className="flex items-center p-1.5 rounded-full border border-green-900 text-xs w-fit mx-auto md:mx-0 bg-green-900/10">
          <div className="flex items-center">
            <OptimizedImage className="w-7 h-7 rounded-full border-[2px] border-green-900 object-cover" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="userImage1" width={28} height={28} />
            <OptimizedImage className="w-7 h-7 rounded-full border-[2px] border-green-900 -translate-x-2 object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="userImage2" width={28} height={28} />
            <OptimizedImage className="w-7 h-7 rounded-full border-[2px] border-green-900 -translate-x-4 object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop" alt="userImage3" width={28} height={28} />
          </div>
          <p className="-translate-x-2 text-xs text-slate-200">Únete a nuestra creciente comunidad</p>
        </div>
        <h1 className="font-medium text-4xl md:text-5xl lg:text-[56px] leading-[1.1] md:leading-[1.15] bg-gradient-to-r max-md:mx-auto from-white to-green-300 bg-clip-text text-transparent max-w-[520px] mt-6 tracking-tight">
          ¿Tienes un proyecto ecológico? Hablemos.
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-[380px] mt-6 mx-auto md:mx-0">
          Escríbenos para compartir ideas, colaborar en soluciones sustentables o simplemente saludar.
        </p> 

        <div className="mt-10 flex flex-col gap-6 max-w-[350px] mx-auto md:mx-0 text-left">
           <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center shrink-0">
                   <Mail className="w-5 h-5 text-green-400" />
               </div>
               <div>
                   <p className="text-xs text-white/40 mb-1">Escríbenos a</p>
                   <a href="mailto:info@geoverdevidaconsciente.com" className="text-sm font-medium text-white hover:text-green-400 transition-colors">info@geoverdevidaconsciente.com</a>
               </div>
           </div>
           <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center shrink-0">
                   <Youtube className="w-5 h-5 text-green-400" />
               </div>
               <div>
                   <p className="text-xs text-white/40 mb-1">Nuestro Canal</p>
                   <a href={content.channel.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-green-400 transition-colors">{content.channel.handle}</a>
               </div>
           </div>
        </div>
      </motion.div>
              
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-lg max-md:mx-auto bg-[#00A63E]/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 relative z-10"
      >
        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="name" className="block text-white/90 text-sm">Nombre</label>
                    {touched.name && errors.name && (
                      <span className="text-[10px] text-red-400 uppercase">{errors.name}</span>
                    )}
                  </div>
                  <input 
                      type="text" 
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Tu nombre..." 
                      className={`w-full bg-[#00A63E]/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-sm focus:outline-none transition-colors ${
                        touched.name && errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                  />
              </div>

              <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="email" className="block text-white/90 text-sm">Correo Electrónico</label>
                    {touched.email && errors.email && (
                      <span className="text-[10px] text-red-400 uppercase">{errors.email}</span>
                    )}
                  </div>
                  <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="tucorreo@ejemplo.com" 
                      className={`w-full bg-[#00A63E]/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-sm focus:outline-none transition-colors ${
                        touched.email && errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                  />
              </div>

              <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="message" className="block text-white/90 text-sm">Mensaje</label>
                    {touched.message && errors.message && (
                      <span className="text-[10px] text-red-400 uppercase">{errors.message}</span>
                    )}
                  </div>
                  <textarea 
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Escribe tu mensaje aquí..." 
                      rows={5}
                      className={`w-full bg-[#00A63E]/5 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 text-sm focus:outline-none transition-colors resize-none ${
                        touched.message && errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-green-500'
                      }`}
                  ></textarea>
              </div>

              {(formError || (touched.name && errors.name) || (touched.email && errors.email) || (touched.message && errors.message)) && (
                <p className="text-xs text-red-400 text-center">
                  {formError || "Por favor, corrige los errores del formulario."}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                  <p className="text-xs text-white/50 max-w-[200px] text-center sm:text-left">
                      Al enviar, aceptas nuestros <Link to="/terminos" className="text-white/80 cursor-pointer hover:text-white transition-colors underline decoration-white/30 decoration-1 underline-offset-2">Términos</Link> y <Link to="/privacidad" className="text-white/80 cursor-pointer hover:text-white transition-colors underline decoration-white/30 decoration-1 underline-offset-2">Privacidad</Link>.
                  </p>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm font-medium px-8 md:px-12 py-3.5 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(22,163,74,0.2)]"
                  >
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </button>
              </div>
          </form>
        ) : (
          <div className="text-center py-16 flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(22,163,74,0.3)]">
              <Send className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-semibold text-white mb-3 tracking-tight">¡Mensaje Enviado!</h4>
            <p className="text-white/60 text-sm max-w-[280px]">Gracias por escribirnos. Nos pondremos en contacto contigo lo antes posible.</p>
            <button 
              onClick={() => setIsSent(false)}
              className="mt-8 bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
            >
              Enviar otro mensaje
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
