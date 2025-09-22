import { useState } from 'react';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  Filter,
  Search,
  Clock,
  Tag
} from 'lucide-react';

const BlogSection = ({ onArticleClick }: { onArticleClick?: (articleId: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "Attention parents : Ne perdez pas le crédit d'impôt pour vos enfants majeurs aux études !",
      excerpt: "Découvrez comment maximiser vos crédits d'impôt pour vos enfants aux études et éviter les erreurs coûteuses.",
      author: "A. Bouhazza",
      date: "2025-05-01",
      category: "Familles",
      image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1746142248689-V5G8J1SIZIET73DKIODQ/headway-5QgIuuBxKwM-unsplash.jpg",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Découvrez le Crédit canadien pour la formation (CCF) avec des exemples concrets !",
      excerpt: "Guide complet du CCF avec calculs pratiques et exemples concrets pour optimiser vos crédits de formation.",
      author: "A. Bouhazza", 
      date: "2025-03-11",
      category: "Formation",
      image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1741672184752-3MJPHEUHK4W4V3A3GY6U/scott-graham-OQMZwNd3ThU-unsplash.jpg",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Les 10 meilleures déductions pour travailleurs autonomes au Canada",
      excerpt: "Liste complète des déductions essentielles pour maximiser vos économies d'impôt en tant que travailleur autonome.",
      author: "A. Bouhazza",
      date: "2025-02-23", 
      category: "Entreprises",
      image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1740366006810-8YJX2BTQRFAV8VHTILPF/jakub-zerdzicki-ykgLX_CwtDw-unsplash.jpg",
      readTime: "10 min"
    },
    {
      id: 4,
      title: "Les acomptes provisionnels : impôt et TPS/TVQ expliqués clairement",
      excerpt: "Comprendre les acomptes provisionnels, quand les payer et comment les calculer pour éviter les pénalités.",
      author: "A. Bouhazza",
      date: "2025-02-23",
      category: "Entreprises", 
      image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1740364916799-SS0PY1LJQ1V3WRBU26UN/jon-tyson-qAQsVsSxp_w-unsplash.jpg",
      readTime: "8 min"
    },
    {
      id: 5,
      title: "Personnes Handicapées : Les clés pour maximiser vos crédits d'impôts",
      excerpt: "Guide spécialisé pour les personnes handicapées sur l'optimisation des crédits et déductions fiscales.",
      author: "A. Bouhazza",
      date: "2025-02-19",
      category: "Crédits",
      image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1739985657967-RAA5ASL5DUN06VJHSP11/service-personne-handicapee.jpg",
      readTime: "6 min"
    },
    {
      id: 6,
      title: "Déclaration de revenus locatifs au Canada pour les non-résidents : Guide complet",
      excerpt: "Tout ce que les non-résidents doivent savoir sur la déclaration de leurs revenus locatifs canadiens.",
      author: "A. Bouhazza",
      date: "2025-02-13",
      category: "Non-résidents",
      image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1726954648244-RMP3M4E0EJWWF0HJ8NLX/scott-webb-1ddol8rgUH8-unsplash.jpg",
      readTime: "12 min"
    }
  ];

  const categories = ['all', 'Familles', 'Formation', 'Entreprises', 'Crédits', 'Non-résidents'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-servitax">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-servitax-primary/10 border border-servitax-primary/20 rounded-full text-servitax-primary text-sm font-semibold mb-6">
            <BookOpen className="h-4 w-4 mr-2" />
            Blog ServitTax
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-servitax-dark mb-6">
            Vos Impôts
            <span className="block text-gradient-primary">Sans Secrets</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plus de 20 ans d'expertise à votre service. Réponses claires aux questions les plus fréquentes 
            en comptabilité, fiscalité et gestion d'entreprise.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-servitax-primary focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-servitax-primary text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-servitax-primary/10 hover:text-servitax-primary border border-gray-200'
                }`}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-servitax-primary text-white text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('fr-CA')}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-servitax-dark mb-4 line-clamp-2 group-hover:text-servitax-primary transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={() => onArticleClick?.(post.id.toString())}
                  className="inline-flex items-center text-servitax-primary font-semibold hover:text-servitax-secondary transition-colors duration-300"
                >
                  Lire l'article
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-servitax-primary/10 to-servitax-secondary/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-servitax-dark mb-6">
              Plus de 20 ans d'expertise à votre service
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre blog est né de vos questions. Nous sélectionnons les sujets qui répondent 
              aux interrogations les plus fréquentes de nos clients.
            </p>
            <button className="btn-servitax-primary">
              <BookOpen className="h-5 w-5 mr-2" />
              Voir tous les articles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;