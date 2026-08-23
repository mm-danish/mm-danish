import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';
import { ProjectDetailClient } from './project-detail-client';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};

    const url = `${siteConfig.url}/projects/${project.slug}`;
    const description = project.longDescription ?? project.description;
    const image = project.image.startsWith('/')
        ? `${siteConfig.url}${project.image}`
        : project.image;

    return {
        title: `${project.title} – Project by M Murtaza Danish`,
        description,
        keywords: [
            project.title,
            ...project.technologies,
            'Full Stack Project',
            'M Murtaza Danish',
            'Next.js Developer',
            'Web Application',
            ...siteConfig.keywords,
        ],
        alternates: { canonical: url },
        openGraph: {
            type: 'article',
            title: `${project.title} – M Murtaza Danish`,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} – M Murtaza Danish`,
            description,
            creator: siteConfig.twitterHandle,
            images: [image],
        },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    // SoftwareSourceCode / CreativeWork JSON-LD
    const projectSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.longDescription ?? project.description,
        url: project.liveUrl,
        codeRepository: project.githubUrl ?? undefined,
        programmingLanguage: project.technologies,
        author: {
            '@type': 'Person',
            name: 'M Murtaza Danish',
            url: siteConfig.url,
        },
        dateCreated: String(project.year),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
            />
            <ProjectDetailClient project={project} />
        </>
    );
}
