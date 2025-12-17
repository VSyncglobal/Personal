import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id, noPadding = false }) => {
  return (
    <section id={id} className={`relative w-full ${noPadding ? '' : 'py-24 md:py-32'} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 md:mb-24 border-l-2 border-enterprise-accent pl-6"
  >
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 uppercase">{title}</h2>
    <p className="text-lg md:text-xl text-enterprise-dim max-w-2xl leading-relaxed">{subtitle}</p>
  </motion.div>
);