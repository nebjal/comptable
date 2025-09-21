import { FileText, Users, Shield, Home, Briefcase, Info, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HomeServitaxClone() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#f5af19] font-[Playfair_Display] text-white">
      {/* Header */}
  <header className="bg-white/10 backdrop-blur-2xl shadow-lg py-4 px-8 flex justify-between items-center relative border-b border-white/10">
        <img src="/logo-servitax.svg" alt="Servitax Logo" className="h-10" />
        {/* Desktop Menu */}
  <nav className="hidden md:flex space-x-8">
          <a href="#" className="flex items-center gap-2 text-white/80 font-semibold hover:text-[#f5af19] transition-all duration-200 hover:underline underline-offset-4">
            <Home className="w-5 h-5" /> Accueil
          </a>
          <a href="#services" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] transition-all duration-200 hover:underline underline-offset-4">
            <Briefcase className="w-5 h-5" /> Services
          </a>
          <a href="#about" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] transition-all duration-200 hover:underline underline-offset-4">
            <Info className="w-5 h-5" /> À propos
          </a>
          <a href="#contact" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] transition-all duration-200 hover:underline underline-offset-4">
            <Mail className="w-5 h-5" /> Contact
          </a>
        </nav>
        {/* Mobile Hamburger */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-xl flex flex-col items-center py-4 z-50 animate-fade-in">
            <a href="#" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] py-2 w-full justify-center border-b" onClick={() => setMenuOpen(false)}>
              <Home className="w-5 h-5" /> Accueil
            </a>
            <a href="#services" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] py-2 w-full justify-center border-b" onClick={() => setMenuOpen(false)}>
              <Briefcase className="w-5 h-5" /> Services
            </a>
            <a href="#about" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] py-2 w-full justify-center border-b" onClick={() => setMenuOpen(false)}>
              <Info className="w-5 h-5" /> À propos
            </a>
            <a href="#contact" className="flex items-center gap-2 text-gray-700 font-medium hover:text-[#66CC33] py-2 w-full justify-center" onClick={() => setMenuOpen(false)}>
              <Mail className="w-5 h-5" /> Contact
            </a>
          </nav>
        )}
  <button className="bg-gradient-to-r from-[#f5af19] to-[#2c5364] text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transition font-semibold ml-4 animate-bounce hover:animate-none">Contactez-nous</button>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8 text-center animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-xl animate-slide-down">
          <span className="block text-white mb-2">Votre comptabilité,</span>
          <span className="block bg-gradient-to-r from-[#f5af19] via-[#2c5364] to-[#0f2027] bg-clip-text text-transparent animate-gradient drop-shadow-xl">simplifiée à l'extrême</span>
        </h1>
        <p className="text-2xl md:text-3xl text-white/80 mb-8 animate-fade-in delay-100 max-w-2xl mx-auto">Cabinet 100% en ligne, rapide et transparent. Gestion, fiscalité, paie, conseils : tout est inclus.</p>
        <img src="/servitax-hero.jpg" alt="Comptabilité moderne" className="mx-auto rounded-3xl shadow-2xl mb-8 w-full max-w-2xl animate-zoom-in border-4 border-white/20" />
        <button className="bg-gradient-to-r from-[#f5af19] to-[#2c5364] text-white px-12 py-5 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 font-bold text-xl animate-bounce">Obtenir un devis</button>
      </section>

      {/* Services Section */}
  <section id="services" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16 animate-fade-in">
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
          <FileText className="w-12 h-12 text-[#66CC33] mb-4 animate-pop" />
          <h2 className="text-2xl font-bold text-[#f5af19] mb-2">Tenue de livres</h2>
          <p className="text-white/80 mb-4 text-center">Gestion complète et sécurisée de votre comptabilité.</p>
        </div>
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
          <Shield className="w-12 h-12 text-[#007BFF] mb-4 animate-pop" />
          <h2 className="text-2xl font-bold text-[#2c5364] mb-2">Fiscalité</h2>
          <p className="text-white/80 mb-4 text-center">Déclarations fiscales, optimisation et conseils personnalisés.</p>
        </div>
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
          <Users className="w-12 h-12 text-[#66CC33] mb-4 animate-pop" />
          <h2 className="text-2xl font-bold text-[#f5af19] mb-2">Paie & RH</h2>
          <p className="text-white/80 mb-4 text-center">Gestion de la paie, des employés et des obligations sociales.</p>
        </div>
      </section>

      {/* Avantages Section */}
  <section className="bg-white/5 py-16 animate-fade-in delay-200">
  <h2 className="text-3xl md:text-4xl font-bold text-[#f5af19] text-center mb-8 tracking-tight animate-slide-up">Pourquoi choisir Servitax ?</h2>
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
            <span className="text-[#f5af19] text-4xl font-extrabold mb-2 animate-pop">100%</span>
            <p className="text-white/80 text-center">En ligne, accessible partout au Canada</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
            <span className="text-[#2c5364] text-4xl font-extrabold mb-2 animate-pop">Rapide</span>
            <p className="text-white/80 text-center">Réponse en moins de 24h, process digitalisé</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
            <span className="text-[#f5af19] text-4xl font-extrabold mb-2 animate-pop">Transparent</span>
            <p className="text-white/80 text-center">Tarifs clairs, pas de surprise, tout inclus</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
            <span className="text-[#2c5364] text-4xl font-extrabold mb-2 animate-pop">Humain</span>
            <p className="text-white/80 text-center">Conseillers dédiés, accompagnement personnalisé</p>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
  <section className="bg-white/10 py-16 animate-fade-in delay-300">
  <h2 className="text-3xl md:text-4xl font-bold text-[#f5af19] text-center mb-8 tracking-tight animate-slide-up">Ils nous font confiance</h2>
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
            <img src="/client1.jpg" alt="Client" className="w-20 h-20 rounded-full mb-4 shadow-lg animate-pop" />
            <p className="text-gray-600 mb-2 text-center">“Service ultra rapide et équipe très humaine !”</p>
            <span className="text-[#f5af19] font-bold">Marie Dubois</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-all duration-300 border border-white/10">
            <img src="/client2.jpg" alt="Client" className="w-20 h-20 rounded-full mb-4 shadow-lg animate-pop" />
            <p className="text-gray-600 mb-2 text-center">“Tarifs clairs, process digital, je recommande !”</p>
            <span className="text-[#2c5364] font-bold">Pierre Martin</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/10 py-8 text-center text-white/80 animate-fade-in delay-400 border-t border-white/10">
        <img src="/logo-servitax.svg" alt="Servitax Logo" className="h-8 mx-auto mb-2" />
        <p className="font-medium">© 2025 Servitax. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
