import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface GenerateMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: GenerateMetadataParams = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.description}`;
  
  const metaDescription = description || siteConfig.description;
  const metaImage = image || `${siteConfig.url}/og-image.png`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: tags || [...siteConfig.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type,
      locale: 'en_US',
      url: siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      publishedTime,
      modifiedTime,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

