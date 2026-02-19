'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const techIcons = [
  { name: 'Next.js', image: '/nextjs.png' },
  { name: 'React', image: '/react.png' },
  { name: 'Node.js', image: '/node.png' },
  { name: 'GraphQL', image: '/graphql.png' },
  { name: 'MongoDB', image: '/mongodb.png' },
  { name: 'GitHub', image: '/github.png' },
];

export function TechStack() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
      {techIcons.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 hover:scale-110 transition-transform duration-300"
        >
          <Image
            src={tech.image}
            alt={tech.name}
            fill
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            title={tech.name}
          />
        </motion.div>
      ))}
    </div>
  );
}

