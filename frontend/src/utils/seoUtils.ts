import { useEffect } from 'react';

// Composant pour les données structurées Schema.org
export function StructuredData({ data }: { data: object }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [data]);

  return null;
}
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "Comptable Pro",
  "description": "Services comptables professionnels au Canada - Tenue de livres, fiscalité, paie et conseils financiers",
  "url": "https://comptablepro.ca",
  "logo": "https://comptablepro.ca/logo.png",
  "image": "https://comptablepro.ca/og-image.jpg",
  "telephone": "+1-514-XXX-XXXX",
  "email": "info@comptablepro.ca",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue de la Comptabilité",
    "addressLocality": "Montréal",
    "addressRegion": "QC",
    "postalCode": "H1A 1A1",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.5017,
    "longitude": -73.5673
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Transfer"],
  "currenciesAccepted": "CAD",
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "serviceType": [
    "Tenue de livres",
    "Services fiscaux",
    "Paie et rémunération",
    "Conseil financier",
    "Migration vers le cloud"
  ],
  "knowsAbout": [
    "Fiscalité canadienne",
    "Impôts des particuliers",
    "Impôts des entreprises",
    "TPS/TVQ",
    "Déclarations fiscales",
    "Planification successorale"
  ]
};

// Données structurées pour les services
export const serviceSchema = (service: {
  name: string;
  description: string;
  price?: string;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "AccountingService",
    "name": "Comptable Pro"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "serviceType": service.category || "Service comptable",
  "offers": service.price ? {
    "@type": "Offer",
    "price": service.price,
    "priceCurrency": "CAD"
  } : undefined
});

// Données structurées pour les articles de blog
export const articleSchema = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Comptable Pro",
    "logo": {
      "@type": "ImageObject",
      "url": "https://comptablepro.ca/logo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "image": article.image || "https://comptablepro.ca/og-image.jpg",
  "url": article.url,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "articleSection": "Fiscalité Canadienne",
  "keywords": ["comptabilité", "fiscalité", "Canada", "impôts"]
});
