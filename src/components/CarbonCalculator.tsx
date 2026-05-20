import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarbonCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CarbonCalculator({ isOpen, onClose }: CarbonCalculatorProps) {
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);

  // Form State
  const [carKm, setCarKm] = useState(50);
  const [publicHours, setPublicHours] = useState(5);
  const [flights, setFlights] = useState('0'); // '0', '1-2', '3+'

  const [energyType, setEnergyType] = useState('Mixta');
  const [people, setPeople] = useState(2);
  const [ac, setAc] = useState('No');
  const [bill, setBill] = useState(50000);

  const [diet, setDiet] = useState('Flexitariana');
  const [localFood, setLocalFood] = useState('A veces');
  const [waste, setWaste] = useState('Regular');

  const [clothes, setClothes] = useState('Trimestral');
  const [recycle, setRecycle] = useState('A veces');
  const [online, setOnline] = useState('Regular');

  const [totalTon, setTotalTon] = useState(0);
  const [breakdown, setBreakdown] = useState({ transport: 0, home: 0, food: 0, consumption: 0 });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setShowResult(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const calculateFootprint = () => {
    // Basic calculation logic for demonstration
    // Transport
    let t = (carKm * 52 * 0.2) / 1000 + (publicHours * 52 * 0.05) / 1000;
    if (flights === '1-2') t += 0.5;
    if (flights === '3+') t += 1.5;

    // Home
    let h = (bill / 20000) * 0.1 / people;
    if (ac === 'Sí') h *= 1.3;
    if (energyType === 'Eléctrica') h *= 0.8;
    if (energyType === 'Solar') h *= 0.2;

    // Food
    let f = 1.0;
    if (diet === 'Carnívora') f = 2.0;
    if (diet === 'Vegetariana') f = 0.5;
    if (diet === 'Vegana') f = 0.3;
    if (localFood === 'Siempre') f *= 0.8;
    if (localFood === 'Casi nunca') f *= 1.2;
    if (waste === 'Mucho') f += 0.5;
    if (waste === 'Poco') f -= 0.2;

    // Consumption
    let c = 0.5;
    if (clothes === 'Mensual') c += 0.5;
    if (clothes === 'Anual') c -= 0.2;
    if (recycle === 'Nunca') c += 0.4;
    if (recycle === 'Siempre') c -= 0.3;
    if (online === 'Mucho') c += 0.3;
    if (online === 'Poco') c -= 0.1;

    setBreakdown({ transport: t, home: h, food: f, consumption: c });
    const total = t + h + f + c;
    setTotalTon(Number(total.toFixed(2)));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      calculateFootprint();
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const getLevel = () => {
    if (totalTon <= 2) return { text: "🌱 Bajo", color: "text-green-400" };
    if (totalTon <= 3.5) return { text: "🌿 Moderado", color: "text-yellow-400" };
    if (totalTon <= 5) return { text: "⚠️ Alto", color: "text-orange-400" };
    return { text: "🔴 Crítico", color: "text-red-500" };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl h-[90vh] sm:h-auto sm:max-h-[90vh] bg-[#1a3a2a] rounded-3xl sm:rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 relative z-10 shrink-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-white italic tracking-tight">Calculadora de Huella de Carbono</h2>
              {!showResult && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-black/40 h-1.5 rounded-full w-40 overflow-hidden">
                    <div 
                      className="bg-brand-secondary h-full transition-all duration-300 ease-out" 
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/50 font-bold tracking-widest ml-2">Paso {step}/4</span>
                </div>
              )}
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 hide-scrollbar relative z-10">
            {!showResult ? (
              <div className="max-w-2xl mx-auto">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Transport */}
                  {step === 1 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 mb-8 text-brand-secondary">
                        <span className="text-3xl">🚗</span>
                        <h3 className="text-2xl font-bold">Transporte</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Kilómetros en auto particular por semana: <span className="text-white font-bold">{carKm} km</span></label>
                        <input 
                          type="range" min="0" max="500" value={carKm} 
                          onChange={(e) => setCarKm(Number(e.target.value))}
                          className="w-full accent-brand-secondary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Horas en transporte público por semana: <span className="text-white font-bold">{publicHours} hrs</span></label>
                        <input 
                          type="range" min="0" max="20" value={publicHours} 
                          onChange={(e) => setPublicHours(Number(e.target.value))}
                          className="w-full accent-brand-secondary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Frecuencia de vuelos</label>
                        <select 
                          value={flights} onChange={(e) => setFlights(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          <option value="0" className="text-black">Nunca</option>
                          <option value="1-2" className="text-black">1-2 veces al año</option>
                          <option value="3+" className="text-black">Frecuentemente (3+)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Home */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 mb-8 text-brand-secondary">
                        <span className="text-3xl">🏠</span>
                        <h3 className="text-2xl font-bold">Hogar</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-white/80 text-sm font-medium">Tipo de energía principal</label>
                          <select 
                            value={energyType} onChange={(e) => setEnergyType(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                          >
                            {['Gas', 'Eléctrica', 'Mixta', 'Solar'].map(opt => (
                              <option key={opt} value={opt} className="text-black">{opt}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-white/80 text-sm font-medium">¿Usas Aire Acond.?</label>
                          <select 
                            value={ac} onChange={(e) => setAc(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                          >
                            <option value="No" className="text-black">No</option>
                            <option value="Sí" className="text-black">Sí</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Personas en tu hogar</label>
                        <input 
                          type="number" min="1" max="10" value={people} 
                          onChange={(e) => setPeople(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Factura mensual prom. (pesos COP)</label>
                        <input 
                          type="number" step="10000" min="0" value={bill} 
                          onChange={(e) => setBill(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Food */}
                  {step === 3 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 mb-8 text-brand-secondary">
                        <span className="text-3xl">🥗</span>
                        <h3 className="text-2xl font-bold">Alimentación</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Tipo de Dieta</label>
                        <select 
                          value={diet} onChange={(e) => setDiet(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          {['Carnívora', 'Flexitariana', 'Vegetariana', 'Vegana'].map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">¿Consumes productos locales?</label>
                        <select 
                          value={localFood} onChange={(e) => setLocalFood(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          {['Siempre', 'A veces', 'Casi nunca'].map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">¿Desperdicias comida?</label>
                        <select 
                          value={waste} onChange={(e) => setWaste(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          {['Mucho', 'Regular', 'Poco'].map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Consumption */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 mb-8 text-brand-secondary">
                        <span className="text-3xl">🛍️</span>
                        <h3 className="text-2xl font-bold">Consumo & Residuos</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Frecuencia de compra de ropa</label>
                        <select 
                          value={clothes} onChange={(e) => setClothes(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          {['Mensual', 'Trimestral', 'Anual'].map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">¿Reciclas en casa?</label>
                        <select 
                          value={recycle} onChange={(e) => setRecycle(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          {['Siempre', 'A veces', 'Nunca'].map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="block text-white/80 font-medium">Volumen de compras online</label>
                        <select 
                          value={online} onChange={(e) => setOnline(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50"
                        >
                          {['Mucho', 'Regular', 'Poco'].map(opt => (
                            <option key={opt} value={opt} className="text-black">{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            ) : (
              /* Results */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto pb-10"
              >
                <div className="text-center mb-10 flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="10" 
                      />
                      <motion.circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" 
                        stroke={totalTon <= 2 ? '#4ade80' : totalTon <= 3.5 ? '#facc15' : totalTon <= 5 ? '#fb923c' : '#ef4444'} 
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * Math.min(totalTon / 6, 1)) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-black italic text-white font-serif">{totalTon}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">ton / año</span>
                    </div>
                  </div>
                  <p className={`text-xl font-bold mt-3 ${getLevel().color}`}>Nivel: {getLevel().text}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="text-2xl mb-2 block">🚗</span>
                    <span className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Transporte</span>
                    <span className="text-white font-bold text-lg">{breakdown.transport.toFixed(1)} t</span>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((breakdown.transport / 3) * 100, 100)}%` }} transition={{ duration: 1 }} className="h-full bg-blue-400" />
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="text-2xl mb-2 block">🏠</span>
                    <span className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Hogar</span>
                    <span className="text-white font-bold text-lg">{breakdown.home.toFixed(1)} t</span>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((breakdown.home / 3) * 100, 100)}%` }} transition={{ duration: 1 }} className="h-full bg-yellow-400" />
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="text-2xl mb-2 block">🥗</span>
                    <span className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Dieta</span>
                    <span className="text-white font-bold text-lg">{breakdown.food.toFixed(1)} t</span>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((breakdown.food / 3) * 100, 100)}%` }} transition={{ duration: 1 }} className="h-full bg-green-400" />
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                    <span className="text-2xl mb-2 block">🛍️</span>
                    <span className="block text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Consumo</span>
                    <span className="text-white font-bold text-lg">{breakdown.consumption.toFixed(1)} t</span>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((breakdown.consumption / 3) * 100, 100)}%` }} transition={{ duration: 1 }} className="h-full bg-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 rounded-3xl p-6 md:p-8 mb-8 border border-white/5">
                  <h4 className="text-white font-bold mb-6 text-lg">Comparativa</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-xs text-white/60 font-bold uppercase">Tú</span>
                      <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="bg-brand-primary h-full rounded-full" style={{ width: `${Math.min((totalTon / 6) * 100, 100)}%` }} />
                      </div>
                      <span className="w-12 text-sm text-white font-bold">{totalTon}</span>
                    </div>
                    <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                      <span className="w-24 text-right text-xs text-white/60 font-bold uppercase">Colombia</span>
                      <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="bg-white/30 h-full rounded-full" style={{ width: `${(1.9 / 6) * 100}%` }} />
                      </div>
                      <span className="w-12 text-sm text-white/60 font-bold">1.9</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-xs text-white/60 font-bold uppercase">Latam</span>
                      <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="bg-white/20 h-full rounded-full" style={{ width: `${(2.8 / 6) * 100}%` }} />
                      </div>
                      <span className="w-12 text-sm text-white/60 font-bold">2.8</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-right text-xs text-white/60 font-bold uppercase">Mundial</span>
                      <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="bg-white/10 h-full rounded-full" style={{ width: `${(4.8 / 6) * 100}%` }} />
                      </div>
                      <span className="w-12 text-sm text-white/60 font-bold">4.8</span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-primary/10 rounded-3xl p-6 md:p-8 border border-brand-primary/20 mb-8">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Leaf className="w-5 h-5 text-brand-secondary" /> Recomendaciones</h4>
                  <ul className="space-y-3 text-white/80 text-sm md:text-base">
                    {breakdown.transport > 1.5 && (
                      <li className="flex gap-3">
                        <span className="text-brand-secondary shrink-0">•</span> 
                        Tu huella de transporte es alta. Considera usar más transporte público, bicicleta, o compartir auto (carpooling).
                      </li>
                    )}
                    {breakdown.food > 1.0 && (
                      <li className="flex gap-3">
                        <span className="text-brand-secondary shrink-0">•</span>
                        Una dieta con menor consumo de origen animal e incrementando productos locales reduce significativamente tu impacto.
                      </li>
                    )}
                    {breakdown.home > 0.8 && (
                      <li className="flex gap-3">
                        <span className="text-brand-secondary shrink-0">•</span>
                        Optimiza tu uso de energía. Revisa el aire acondicionado, utiliza luces LED y desconecta dispositivos sin uso.
                      </li>
                    )}
                    {breakdown.consumption > 0.7 && (
                      <li className="flex gap-3">
                        <span className="text-brand-secondary shrink-0">•</span>
                        Adopta la regla de las 3R (Reducir, Reutilizar, Reciclar) para bajar la huella de tus compras y ropa.
                      </li>
                    )}
                    {totalTon <= 2 && (
                      <li className="flex gap-3">
                        <span className="text-brand-secondary shrink-0">•</span>
                        ¡Excelente! Tienes un impacto muy bajo. Sigue siendo un ejemplo y comparte tus hábitos con otros.
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(`Calculé mi huella de carbono en GeoVerde: ${totalTon} toneladas/año. ¿Cuál es la tuya? geoverdevidaconsciente.com`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors"
                  >
                    <Share2 className="w-5 h-5" /> Compartir en WhatsApp
                  </a>
                  <Link 
                    to="/#contact"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 bg-brand-secondary text-brand-primary px-6 py-4 rounded-xl font-bold hover:bg-brand-secondary/90 transition-colors"
                  >
                    Solicita consultoría <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          {!showResult && (
            <div className="p-6 sm:p-8 border-t border-white/10 flex justify-between bg-black/20 relative z-10 shrink-0">
              <button 
                onClick={handleBack}
                disabled={step === 1}
                className="px-6 py-3 text-white/50 font-bold disabled:opacity-30 hover:text-white transition-colors"
              >
                Atrás
              </button>
              <button 
                onClick={handleNext}
                className="px-8 py-3 bg-brand-primary text-brand-secondary rounded-full font-bold hover:bg-brand-primary/90 transition-transform active:scale-95 shadow-lg shadow-black/20"
              >
                {step === 4 ? 'Calcular Mi Huella' : 'Siguiente'}
              </button>
            </div>
          )}

          {/* Ambient Background decoration inside modal */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-primary/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
