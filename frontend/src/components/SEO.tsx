import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  structuredData?: object;
  aiKeywords?: string[];
  aiDescription?: string;
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData,
  aiKeywords = [],
  aiDescription
}: SEOProps) {
  const fullTitle = `${title} | Comptable Pro - Services Comptables Canadiens`;
  const fullDescription = aiDescription || description;

  // Mots-clés optimisés par IA pour le référencement
  const allKeywords = [
    ...keywords,
    ...aiKeywords,
    'comptable',
    'fiscalité',
    'impôts',
    'services comptables',
    'Canada',
    'Québec',
    'tenue de livres',
    'paie',
    'conseil fiscal'
  ];

  useEffect(() => {
    // Mise à jour dynamique du titre pour le SEO
    document.title = fullTitle;

    // Ajout de méta données structurées pour les moteurs de recherche
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [fullTitle, structuredData]);

  return (
    <Helmet>
      {/* Balises meta de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content="Comptable Pro" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Balises Open Graph pour les réseaux sociaux */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical || window.location.href} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Comptable Pro" />
      <meta property="og:locale" content="fr_CA" />

      {/* Balises Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Balises spécifiques au Canada et à la fiscalité */}
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.country" content="Canada" />
      <meta name="geo.placename" content="Québec, Canada" />

      {/* Balises pour les moteurs de recherche canadiens */}
      <meta name="language" content="fr-CA" />
      <meta httpEquiv="content-language" content="fr-CA" />

      {/* URL canonique */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Préconnexion pour améliorer les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Balises pour les applications mobiles */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Comptable Pro" />

      {/* Balises pour les moteurs de recherche avec IA */}
      <meta name="ai-optimized" content="true" />
      <meta name="ai-keywords" content={aiKeywords.join(', ')} />
      <meta name="ai-description" content={aiDescription || description} />
    </Helmet>
  );
}
