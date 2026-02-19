import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ExperienceTimeline />
      <Projects />
      <Contact />
    </>
  );
}

