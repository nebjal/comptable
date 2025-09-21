import { useState } from 'react';
import { CreditCard, Banknote, DollarSign, Shield, CheckCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './Animations';

export default function PaiementEnLigne() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const honorairesPayments = [
    {
      id: 'credit-card',
      title: 'Cartes de Crédit',
      icon: CreditCard,
      description: 'Vous recevrez par courriel votre facture électronique avec un lien sécurisé pour effectuer le paiement par carte de crédit.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'interac',
      title: 'Transfert Interac',
      icon: Banknote,
      description: 'Utilisez votre service bancaire en ligne pour effectuer un paiement via Interac à l\'adresse suivante : info@servitax.ca',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'paypal',
      title: 'Paypal',
      icon: DollarSign,
      description: 'Un lien vous sera fourni pour effectuer le paiement via votre compte Paypal, ou par carte de crédit ou débit sans avoir besoin de créer un compte Paypal.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const taxesPayments = [
    {
      id: 'arc',
      title: 'Agence du revenu du Canada (ARC)',
      description: 'Vous pouvez payer vos impôts fédéraux directement sur le site de l\'Agence du revenu du Canada via leur portail sécurisé.',
      link: 'https://www.canada.ca/en/revenue-agency/services/payments-cra.html',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'revenu-quebec',
      title: 'Revenu Québec',
      description: 'Vous pouvez payer vos impôts provinciaux en ligne via le portail sécurisé de Revenu Québec.',
      link: 'https://www.revenuquebec.ca/fr/modes-de-paiement/',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-blue-950 to-indigo-950">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium mb-6">
            <DollarSign className="h-4 w-4 mr-2" />
            Services de Paiement
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Paiement
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              en Ligne
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Effectuez vos paiements de manière sécurisée et pratique. Plusieurs options disponibles pour vos honoraires et vos impôts.
          </p>
        </ScrollReveal>

        {/* Paiement des Honoraires */}
        <ScrollReveal direction="up" delay={0.2} className="mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              Paiement de vos Honoraires
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {honorairesPayments.map((payment) => {
                const Icon = payment.icon;
                return (
                  <div
                    key={payment.id}
                    className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer ${
                      selectedPayment === payment.id ? 'ring-2 ring-emerald-400' : ''
                    }`}
                    onClick={() => setSelectedPayment(selectedPayment === payment.id ? null : payment.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-br ${payment.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                        {payment.title}
                      </h3>

                      <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        {payment.description}
                      </p>

                      <div className="mt-4 flex items-center text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium">En savoir plus</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Paiement des Impôts */}
        <ScrollReveal direction="up" delay={0.4} className="mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              Paiement de vos Impôts
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {taxesPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${payment.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform duration-300`}>
                      <Shield className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {payment.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300">
                      {payment.description}
                    </p>

                    <a
                      href={payment.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Accéder au Portail
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Sécurité et Garanties */}
        <ScrollReveal direction="up" delay={0.6} className="mb-16">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              Sécurité et Garanties
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Chiffrement SSL</h4>
                <p className="text-white/70 text-sm">Protection de niveau bancaire pour toutes vos transactions</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Conformité PCI</h4>
                <p className="text-white/70 text-sm">Respect des normes de sécurité des cartes de paiement</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Garantie Anti-Fraude</h4>
                <p className="text-white/70 text-sm">Protection contre les transactions frauduleuses</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Support 24/7</h4>
                <p className="text-white/70 text-sm">Assistance technique disponible en tout temps</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal direction="up" delay={0.8} className="text-center">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-8">Besoin d'Aide ?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans vos démarches de paiement.
              Contactez-nous pour toute question ou assistance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Téléphone</div>
                  <div className="text-white/70 text-sm">1 (514) 215-2020</div>
                  <div className="text-white/70 text-sm">1 (514) 215-2001</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Courriel</div>
                  <div className="text-white/70 text-sm">info@servitax.ca</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Adresse</div>
                  <div className="text-white/70 text-sm">100-1490, Rue La Fontaine</div>
                  <div className="text-white/70 text-sm">Saint-Laurent, QC H4L 5M1</div>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Nous Contacter
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
