import { Link } from 'react-router-dom';
import content from '../data/content.json';

export default function Footer() {
  return (
    <footer className="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-gray-800/70 font-sans">
        <div className="flex flex-wrap justify-center items-center gap-8 px-4">
            <Link to="/" className="font-medium text-gray-500 hover:text-black transition-all">
                Inicio
            </Link>
            <Link to="/#nosotros" className="font-medium text-gray-500 hover:text-black transition-all">
                Nosotros
            </Link>
            <Link to="/#videos" className="font-medium text-gray-500 hover:text-black transition-all">
                Videos
            </Link>
            <Link to="/blog" className="font-medium text-gray-500 hover:text-black transition-all">
                Noticias
            </Link>
            <Link to="/#contact" className="font-medium text-gray-500 hover:text-black transition-all">
                Contacto
            </Link>
        </div>
        <div className="flex items-center gap-4 mt-8 text-indigo-500">
            <a href={content.channel.social.facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            <a href={content.channel.social.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            <a href={content.channel.url || "#"} target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
            <a href="https://www.tiktok.com/@geoverdecon100" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-0.5 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v11a7 7 0 1 1-7-7v3a4 4 0 0 0 3 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
        </div>
        <p className="mt-8 text-center px-4">Copyright © 2026 GeoVerde Vida Consciente. Todos los derechos reservados.</p>
    </footer>
  );
}
