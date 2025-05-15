import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  hashtags?: string;
  canonical?: string;
  locale?: string;
}

function SEO({
  title,
  description,
  keywords,
  image,
  url,
  ogType = "website",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  twitterImage,
  hashtags,
  canonical,
  locale = "en_US"
}: SEOProps) {
  const siteUrl = 'https://www.shilltube.fun/';
  const defaultImage = `https://www.shilltube.fun/images/icon-256w.png`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {hashtags && <meta name="keywords" content={hashtags} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url || canonical || siteUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || canonical || siteUrl} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={twitterImage || image || defaultImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url || siteUrl} />
    </Helmet>
  );
}

export default SEO;