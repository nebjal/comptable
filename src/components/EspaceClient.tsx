import React, { useState } from 'react';
import { ScrollReveal } from './Animations';
import { Shield, Users, ArrowRight, UserPlus, Building2, FileText } from 'lucide-react';

const EspaceClient: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<'admin' | 'client' | null>(null);

  const handleAdminLogin = () => {
    // Logique de connexion admin
    console.log('Connexion admin');
  };

  const handleClientLogin = () => {
    // Logique de connexion client
    console.log('Connexion client');
  };

  if (selectedSpace === 'admin') {
    return (
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-indigo-950 min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Espace Administrateur</h2>
              <p className="text-white/70">Accès complet au système de gestion</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Email Administrateur</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 transition-colors"
                  placeholder="admin@servitax.ca"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-red-400 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                onClick={handleAdminLogin}
                className="w-full bg-gradient-to-r from-red-400 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Accéder à l'Administration
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedSpace(null)}
                className="text-white/60 hover:text-white text-sm"
              >
                ← Retour au choix d'espace
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSpace === 'client') {
    return (
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-indigo-950 min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Espace Client</h2>
              <p className="text-white/70">Accès à vos documents personnels</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                onClick={handleClientLogin}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedSpace(null)}
                className="text-white/60 hover:text-white text-sm"
              >
                ← Retour au choix d'espace
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-indigo-950 min-h-screen">
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Building2 className="h-4 w-4 mr-2" />
            Centre Pro des Impôts
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Services d'impôts et de
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              comptabilité en ligne
            </span>
          </h1>

          <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-12">
            Choisissez votre espace
          </p>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Sélectionnez l'espace qui correspond à votre profil pour accéder à vos services.
          </p>
        </ScrollReveal>

        {/* Space Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Admin Space */}
          <ScrollReveal direction="left" delay={0.2}>
            <div
              onClick={() => setSelectedSpace('admin')}
              className="group relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-red-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-red-500/25 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Espace Administrateur</h3>
                    <p className="text-red-400 text-sm font-medium">Pour comptables et administrateurs</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  Accès complet au système de gestion comptable, clients, documents et rapports.
                </p>

                <div className="flex items-center text-white/60 text-sm">
                  <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Cliquez pour accéder</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Client Space */}
          <ScrollReveal direction="right" delay={0.3}>
            <div
              onClick={() => setSelectedSpace('client')}
              className="group relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-cyan-500/25 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Espace Client</h3>
                    <p className="text-cyan-400 text-sm font-medium">Pour clients inscrits</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  Accès à vos documents personnels, déclarations et suivi de vos dossiers.
                </p>

                <div className="flex items-center text-white/60 text-sm">
                  <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Cliquez pour accéder</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Quick Access */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="text-center mb-12">
            <button
              onClick={() => setSelectedSpace('client')}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                <FileText className="h-5 w-5 mr-3" />
                Accéder à mon espace client
              </div>
            </button>

            <div className="flex items-center justify-center space-x-2 text-white/60">
              <span>Pas encore de compte ?</span>
              <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center">
                <UserPlus className="h-4 w-4 mr-1" />
                Créer mon dossier
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <div className="text-center border-t border-white/10 pt-8">
          <p className="text-white/40 text-sm">
            © 2025 Groupe ServiTax Solutions Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EspaceClient;