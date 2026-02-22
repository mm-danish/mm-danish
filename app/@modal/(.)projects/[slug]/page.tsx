import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectModal } from '@/components/ui/project-modal';

interface Props {
    params: Promise<{ slug: string }>;
}

/**
 * Intercepting route: catches /projects/[slug] navigation
 * from within the app and renders the project as a modal.
 *
 * Direct URL access / hard refresh still shows the full
 * detail page at app/projects/[slug]/page.tsx — this only
 * fires during client-side navigation (soft navigation).
 */
export default async function InterceptedProjectModal({ params }: Props) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return <ProjectModal project={project} />;
}
