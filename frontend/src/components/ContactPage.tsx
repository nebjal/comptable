import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Calendar } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: 'comptabilite'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['123 Avenue des Comptables', '75008 Paris, France'],
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+33 1 42 86 95 32', '+33 6 12 34 56 78'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@servitax.fr', 'support@servitax.fr'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lundi - Vendredi: 9h - 18h', 'Samedi: 9h - 12h'],
      color: 'text-orange-600'
    }
  ];

  const services = [
    { value: 'comptabilite', label: 'Comptabilité générale' },
    { value: 'fiscalite', label: 'Fiscalité et déclarations' },
    { value: 'conseil', label: 'Conseil en gestion' },
    { value: 'paie', label: 'Comptabilité de paie' },
    { value: 'creation', label: 'Création d\'entreprise' },
    { value: 'audit', label: 'Audit et due diligence' },
    { value: 'digital', label: 'Solutions digitales' },
    { value: 'autre', label: 'Autre demande' }
  ];

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Générale',
      email: 'marie.dubois@servitax.fr',
      phone: '+33 1 42 86 95 32',
      specialite: 'Comptabilité générale',
      image: 'MD'
    },
    {
      name: 'Pierre Martin',
      role: 'Expert Comptable',
      email: 'pierre.martin@servitax.fr',
      phone: '+33 1 42 86 95 33',
      specialite: 'Fiscalité d\'entreprise',
      image: 'PM'
    },
    {
      name: 'Sophie Garcia',
      role: 'Conseillère',
      email: 'sophie.garcia@servitax.fr',
      phone: '+33 1 42 86 95 34',
      specialite: 'Création d\'entreprise',
      image: 'SG'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        service: 'comptabilite'
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Contactez-nous
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contactez-
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              nous
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            et vous accompagner dans vos projets comptables.
          </p>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Appel Rapide</h3>
              <p className="text-gray-600 mb-4">Obtenez une réponse immédiate</p>
              <a href="tel:+33142869532" className="text-blue-600 font-semibold hover:text-blue-700">
                +33 1 42 86 95 32
              </a>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rendez-vous</h3>
              <p className="text-gray-600 mb-4">Planifiez une consultation</p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Réserver maintenant
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chat en Ligne</h3>
              <p className="text-gray-600 mb-4">Discutez avec un expert</p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Démarrer le chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Coordonnées</h2>

              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${info.color} bg-gray-100`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Team Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Équipe</h3>
                <div className="space-y-6">
                  {team.map((member, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-white font-bold">{member.image}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-blue-600">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{member.specialite}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          <Mail className="h-4 w-4 inline mr-2" />
                          {member.email}
                        </p>
                        <p className="text-gray-600">
                          <Phone className="h-4 w-4 inline mr-2" />
                          {member.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Message envoyé !</h3>
                  <p className="text-green-700">
                    Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+33 6 XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Entreprise
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Service souhaité *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Objet de votre demande"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold text-lg flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nous Trouver
            </h2>
            <p className="text-xl text-gray-600">
              Venez nous rencontrer dans nos bureaux parisiens
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50">
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Carte interactive</p>
                <p className="text-gray-400">123 Avenue des Comptables, 75008 Paris</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
