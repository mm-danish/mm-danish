import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog/posts';
import { siteConfig } from '@/config/site';
import { BlogPostClient } from './blog-post-client';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return {};

    const url = `${siteConfig.url}/blog/${post.slug}`;

    return {
        title: post.title,
        description: post.excerpt,
        keywords: [
            post.category,
            'Software Engineering',
            'Full Stack Development',
            'Next.js',
            'M Murtaza Danish',
            ...siteConfig.keywords,
        ],
        alternates: { canonical: url },
        authors: [{ name: 'M Murtaza Danish', url: siteConfig.url }],
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            url,
            siteName: siteConfig.name,
            publishedTime: post.date,
            authors: ['M Murtaza Danish'],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            creator: siteConfig.twitterHandle,
            images: [post.image],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    // Article JSON-LD
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: 'M Murtaza Danish',
            url: siteConfig.url,
            sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
                siteConfig.links.twitter,
            ],
        },
        publisher: {
            '@type': 'Person',
            name: 'M Murtaza Danish',
            url: siteConfig.url,
        },
        url: `${siteConfig.url}/blog/${post.slug}`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}/blog/${post.slug}`,
        },
        articleSection: post.category,
        wordCount: post.content.split(' ').length,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <BlogPostClient post={post} />
        </>
    );
}
