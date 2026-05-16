// src/animations.js
// Sistema de animaciones Vanilla puro para GeoVerde Vida Consciente sin dependencias

// Comprobar preferencias de accesibilidad (prefers-reduced-motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Intersection Observer para Fade-in + Slide-up (.animate-on-scroll)
const scrollObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  if (prefersReducedMotion) return;
  
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Dejar de observar una vez animado
      observer.unobserve(entry.target);
    }
  });
}, scrollObserverOptions);

// 2. Observer para Stagger Animations (.stagger-container > .stagger-item)
const staggerObserver = new IntersectionObserver((entries, observer) => {
  if (prefersReducedMotion) return;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        // Asignar delay dinámico basado en el índice
        item.style.transitionDelay = `${index * 150}ms`;
        item.classList.add('is-visible');
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// 3. Efecto Typewriter (.typewriter)
function initTypewriter(element) {
  if (prefersReducedMotion || element.dataset.typewriterInitialized) return;
  
  const text = element.dataset.originalText || element.textContent;
  if (!element.dataset.originalText) {
    element.dataset.originalText = text;
  }
  
  element.textContent = '';
  element.dataset.typewriterInitialized = 'true';
  element.style.opacity = '1';
  
  let i = 0;
  const speed = 40; // ms por letra
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing');
    }
  }
  
  // Pequeño delay antes de empezar
  setTimeout(() => {
    element.classList.add('typing');
    type();
  }, 300);
}

const typewriterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initTypewriter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });


// 4. Parallax suave para hero (.parallax-bg)
function applyParallax() {
  if (prefersReducedMotion) return;
  
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // requestAnimationFrame para mejor rendimiento fluido
    requestAnimationFrame(() => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        const yPos = scrolled * speed;
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    });
  }, { passive: true });
}

// Inicialización general que maneja SPA/React (detecta elementos nuevos)
export function initAnimations() {
  // Animar elementos individuales
  document.querySelectorAll('.animate-on-scroll:not(.observed)').forEach(el => {
    el.classList.add('observed');
    scrollObserver.observe(el);
  });
  
  // Elementos stagger
  document.querySelectorAll('.stagger-container:not(.observed)').forEach(el => {
    el.classList.add('observed');
    staggerObserver.observe(el);
  });
  
  // Elementos typewriter
  document.querySelectorAll('.typewriter:not(.observed)').forEach(el => {
    el.classList.add('observed');
    el.style.opacity = '0'; // ocultar hasta que Typewriter comience
    typewriterObserver.observe(el);
  });
  
  // Configurar parallax (solo inicializar el evento una vez)
  if (!window.parallaxInitialized) {
    applyParallax();
    window.parallaxInitialized = true;
  }
}

// Inyección de los estilos CSS necesarios
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  /* 1. Fade-in y Slide-up */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), 
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 2. Stagger items */
  .stagger-item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), 
                transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .stagger-item.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 3. Typewriter cursor */
  .typewriter.typing::after {
    content: '|';
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* 4. Parallax */
  .parallax-bg {
    will-change: transform;
  }

  /* Accesibilidad: Reducción de movimiento */
  @media (prefers-reduced-motion: reduce) {
    .animate-on-scroll, .stagger-item, .parallax-bg, .typewriter::after {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
      animation: none !important;
    }
  }
`;
document.head.appendChild(animationStyles);

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', initAnimations);

// Escuchar cambios en el DOM para entornos de SPA / React
const observer = new MutationObserver((mutations) => {
  let shouldInit = false;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      shouldInit = true;
      break;
    }
  }
  if (shouldInit) {
    setTimeout(initAnimations, 50); // Dar respiro al renderizado
  }
});
observer.observe(document.body, { childList: true, subtree: true });
