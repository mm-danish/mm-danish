import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
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

    return {
        title: `${project.title} | M Murtaza Danish`,
        description: project.longDescription ?? project.description,
        openGraph: {
            title: project.title,
            description: project.longDescription ?? project.description,
            images: [{ url: project.image }],
        },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return <ProjectDetailClient project={project} />;
}
