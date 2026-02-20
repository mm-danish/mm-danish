'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const techIcons = [
  { name: 'Next.js', image: '/nextjs.png' },
  { name: 'React', image: '/react.png' },
  { name: 'Node.js', image: '/node.png' },
  { name: 'Express', image: '/express.svg' },
  { name: 'PostgreSQL', image: '/postgresql.svg' },
  { name: 'MongoDB', image: '/mongodb.png' },
  { name: 'Redis', image: '/redis.svg' },
  { name: 'GraphQL', image: '/graphql.png' },
  { name: 'Stripe', image: '/stripe.svg' },
  { name: 'GitHub', image: '/github.png' },
];

export function TechStack() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
      {techIcons.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative w-12 h-12 sm:w-14 sm:h-14 hover:scale-110 transition-transform duration-300 group"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src={tech.image}
            alt={tech.name}
            fill
            className={`
              object-contain transition-all duration-300
              ${resolvedTheme === 'dark' && ['Next.js', 'Express', 'GitHub'].includes(tech.name) ? 'invert' : ''}
            `}
            title={tech.name}
          />
        </motion.div>
      ))}
    </div>
  );
}

