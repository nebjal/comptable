import { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  BookOpen, 
  Share2, 
  Heart, 
  MessageCircle,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Calculator,
  FileText,
  Target,
  TrendingUp
} from 'lucide-react';

interface BlogArticlePageProps {
  articleId?: string;
  onBack: () => void;
}

const BlogArticlePage = ({ articleId = '1', onBack }: BlogArticlePageProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(247);

  // Article de blog authentique basé sur le contenu ServitTax
  const article = {
    id: articleId,
    title: "Attention parents : Ne perdez pas le crédit d'impôt pour vos enfants majeurs aux études !",
    author: "A. Bouhazza",
    date: "2025-05-01",
    readTime: "8 min",
    category: "Familles",
    image: "https://images.squarespace-cdn.com/content/v1/66ef3c957777764cc84b623b/1746142248689-V5G8J1SIZIET73DKIODQ/headway-5QgIuuBxKwM-unsplash.jpg",
    excerpt: "Découvrez comment maximiser vos crédits d'impôt pour vos enfants aux études et éviter les erreurs coûteuses.",
    content: `
      <p class="lead">Chaque année, de nombreux parents perdent des centaines, voire des milliers de dollars en crédits d'impôt simplement parce qu'ils ne connaissent pas les règles concernant leurs enfants majeurs aux études. Cet article vous explique tout ce que vous devez savoir pour maximiser vos avantages fiscaux.</p>

      <h2>Les règles fondamentales à connaître</h2>
      
      <p>Quand votre enfant atteint 18 ans, plusieurs changements importants s'opèrent au niveau fiscal :</p>
      
      <ul>
        <li><strong>Montant pour personne à charge admissible :</strong> Vous pouvez continuer à le réclamer s'il répond aux critères</li>
        <li><strong>Frais de scolarité :</strong> Votre enfant peut vous transférer ses crédits non utilisés</li>
        <li><strong>Frais de garde :</strong> Ces frais s'arrêtent généralement à 16 ans, sauf exceptions</li>
        <li><strong>Prestations pour enfants :</strong> L'Allocation canadienne pour enfants se termine le mois où votre enfant atteint 18 ans</li>
      </ul>

      <h2>Le piège de la déclaration séparée</h2>
      
      <p>Beaucoup de parents croient qu'une fois leur enfant majeur, celui-ci doit absolument produire sa propre déclaration. <strong>C'est faux !</strong> Même si votre enfant de 18 ans ou plus étudie et n'a aucun revenu, vous pouvez souvent bénéficier d'avantages fiscaux plus importants en le gardant comme personne à charge.</p>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
        <div class="flex">
          <AlertTriangle class="h-6 w-6 text-yellow-400 mt-1" />
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              <strong>Attention :</strong> Si votre enfant produit sa propre déclaration et réclame le montant personnel de base, vous ne pourrez plus le réclamer comme personne à charge admissible.
            </p>
          </div>
        </div>
      </div>

      <h2>Stratégies d'optimisation pour 2024-2025</h2>

      <h3>1. Analyse du transfert des frais de scolarité</h3>
      <p>Votre enfant peut vous transférer jusqu'à <strong>5,000 $ de ses frais de scolarité</strong> s'il n'en a pas besoin pour réduire son impôt à zéro. Cette stratégie peut vous faire économiser plusieurs centaines de dollars.</p>

      <h3>2. Optimisation du crédit pour personne à charge</h3>
      <p>Le montant pour personne à charge admissible peut atteindre <strong>jusqu'à 13,808 $ en 2024</strong> (montant fédéral et provincial combiné au Québec). Voici les critères :</p>
      
      <ul>
        <li>Votre enfant doit résider avec vous</li>
        <li>Il ne doit pas avoir de conjoint</li>
        <li>Ses revenus ne doivent pas dépasser un certain seuil</li>
        <li>Personne d'autre ne peut le réclamer</li>
      </ul>

      <h3>3. Planification des revenus d'été</h3>
      <p>Si votre enfant travaille l'été, planifiez ses revenus pour qu'ils restent sous les seuils critiques. Parfois, reporter quelques heures de travail en janvier peut vous faire économiser des centaines de dollars.</p>

      <h2>Calculateur pratique</h2>
      
      <div class="bg-servitax-primary/5 rounded-2xl p-6 my-8">
        <h4 class="font-bold text-servitax-dark mb-4 flex items-center">
          <Calculator class="h-5 w-5 mr-2" />
          Exemple concret - Famille Tremblay
        </h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>Crédit personne à charge (fédéral + provincial) :</span>
            <span class="font-semibold text-green-600">+ 2,847 $</span>
          </div>
          <div class="flex justify-between">
            <span>Transfert frais scolarité (3,200 $ × 29%) :</span>
            <span class="font-semibold text-green-600">+ 928 $</span>
          </div>
          <div class="flex justify-between border-t border-gray-200 pt-2">
            <span class="font-bold">Économie totale annuelle :</span>
            <span class="font-bold text-green-600">3,775 $</span>
          </div>
        </div>
      </div>

      <h2>Erreurs coûteuses à éviter</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-red-50 rounded-xl p-6">
          <h4 class="font-bold text-red-800 mb-3 flex items-center">
            <X class="h-5 w-5 mr-2" />
            À ne pas faire
          </h4>
          <ul class="text-sm text-red-700 space-y-2">
            <li>• Laisser votre enfant produire sa déclaration sans analyse</li>
            <li>• Ignorer les seuils de revenus critiques</li>
            <li>• Oublier de demander le transfert des frais de scolarité</li>
            <li>• Ne pas considérer l'impact sur les prestations provinciales</li>
          </ul>
        </div>
        
        <div class="bg-green-50 rounded-xl p-6">
          <h4 class="font-bold text-green-800 mb-3 flex items-center">
            <CheckCircle class="h-5 w-5 mr-2" />
            Bonnes pratiques
          </h4>
          <ul class="text-sm text-green-700 space-y-2">
            <li>• Consulter un professionnel avant de décider</li>
            <li>• Comparer les deux scénarios fiscaux</li>
            <li>• Planifier les revenus d'été de votre enfant</li>
            <li>• Documenter la résidence et la dépendance</li>
          </ul>
        </div>
      </div>

      <h2>Conclusion et prochaines étapes</h2>
      
      <p>La fiscalité des enfants majeurs aux études est complexe, mais les enjeux financiers sont importants. Une planification adéquate peut vous faire économiser plusieurs milliers de dollars par année.</p>

      <div class="bg-servitax-primary/10 rounded-2xl p-6 my-8">
        <h4 class="font-bold text-servitax-dark mb-3">Besoin d'aide personnalisée ?</h4>
        <p class="text-gray-700 mb-4">Nos experts ServitTax peuvent analyser votre situation spécifique et vous proposer la stratégie la plus avantageuse.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button class="bg-servitax-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-servitax-primary/90 transition-colors">
            Consultation gratuite
          </button>
          <button class="border border-servitax-primary text-servitax-primary px-6 py-3 rounded-xl font-semibold hover:bg-servitax-primary/5 transition-colors">
            Calculateur REER
          </button>
        </div>
      </div>
    `,
    tags: ['Famille', 'Crédits', 'Étudiants', 'Déclarations', 'Optimisation'],
    relatedArticles: [
      {
        id: '2',
        title: 'Découvrez le Crédit canadien pour la formation (CCF)',
        excerpt: 'Guide complet du CCF avec calculs pratiques',
        readTime: '7 min'
      },
      {
        id: '3', 
        title: 'Les 10 meilleures déductions pour travailleurs autonomes',
        excerpt: 'Maximisez vos économies d\'impôt',
        readTime: '10 min'
      },
      {
        id: '4',
        title: 'REER vs CELI : Quelle stratégie choisir en 2025 ?',
        excerpt: 'Comparaison détaillée pour optimiser vos épargnes',
        readTime: '12 min'
      }
    ]
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container-servitax px-6 py-4">
          <button 
            onClick={onBack}
            className="flex items-center text-servitax-primary hover:text-servitax-secondary transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour au blog
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-servitax-primary text-white rounded-full text-sm font-semibold">
                {article.category}
              </span>
              <div className="flex items-center text-gray-600 text-sm space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(article.date).toLocaleDateString('fr-CA')}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-servitax-primary/10 text-servitax-primary rounded-xl hover:bg-servitax-primary/20 transition-colors duration-300">
                <Share2 className="h-5 w-5" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container-servitax px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden mb-12">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-servitax-dark mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="article-content text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
            <span className="text-gray-600 font-semibold mr-3">Tags :</span>
            {article.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-servitax-primary/10 text-servitax-primary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Related Articles  */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-servitax-dark mb-8">Articles Connexes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {article.relatedArticles.map((related, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <h4 className="font-bold text-servitax-dark mb-3 line-clamp-2">{related.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{related.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {related.readTime}
                    </span>
                    <button className="text-servitax-primary hover:text-servitax-secondary font-semibold text-sm flex items-center">
                      Lire
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-br from-servitax-primary to-servitax-secondary rounded-3xl p-8 lg:p-12 text-white text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-servitax-light" />
            <h3 className="text-2xl font-bold mb-4">Ne manquez aucun conseil fiscal</h3>
            <p className="text-servitax-light mb-8 max-w-2xl mx-auto">
              Recevez nos meilleurs conseils fiscaux et comptables directement dans votre boîte mail. 
              Plus de 20 ans d'expertise à votre service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-500 border-0 focus:ring-2 focus:ring-white outline-none"
              />
              <button className="bg-white text-servitax-primary px-6 py-3 rounded-xl font-semibold hover:bg-servitax-light transition-colors duration-300">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticlePage;