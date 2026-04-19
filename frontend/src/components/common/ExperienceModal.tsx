'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const products = [
  {
    id: 'mountain-bike',
    name: 'Mountain Bike',
    emoji: '🚴',
    price: '$899',
    tagline: 'Built to conquer any terrain',
    gradient: 'from-accent-teal to-neon-green',
    glowColor: 'rgba(13,255,198,0.3)',
    borderColor: 'border-accent-teal/40',
  },
  {
    id: 'gaming-chair',
    name: 'Gaming Chair',
    emoji: '🎮',
    price: '$399',
    tagline: 'Ergonomic comfort for champions',
    gradient: 'from-accent-purple to-accent-teal',
    glowColor: 'rgba(191,90,242,0.3)',
    borderColor: 'border-accent-purple/40',
  },
  {
    id: 'iphone',
    name: 'iPhone 17 Pro',
    emoji: '📱',
    price: '$1,199',
    tagline: 'The future in your hand',
    gradient: 'from-neon-green to-accent-gold',
    glowColor: 'rgba(57,255,20,0.3)',
    borderColor: 'border-neon-green/40',
  },
];

export default function ExperienceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-muted hover:text-white transition-colors text-sm font-heading tracking-widest uppercase flex items-center gap-2"
            >
              Close <span className="text-lg">✕</span>
            </button>

            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-10"
            >
              <motion.h2
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Choose Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-accent-teal to-accent-purple drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                  Future Experience
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-muted mt-3 text-sm sm:text-base"
              >
                Explore premium products with immersive storytelling
              </motion.p>
            </motion.div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.4 + i * 0.15,
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                  }}
                >
                  <Link
                    href={`/experience/${product.id}`}
                    onClick={onClose}
                    className={`group block relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border ${product.borderColor} hover:border-white/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-3xl"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${product.glowColor}, transparent 70%)`,
                      }}
                    />

                    {/* Emoji Icon */}
                    <motion.div
                      className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      {product.emoji}
                    </motion.div>

                    {/* Info */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300 relative z-10">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-dim mt-1 mb-4 relative z-10">
                      {product.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between relative z-10">
                      <span
                        className={`font-heading text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}
                      >
                        {product.price}
                      </span>
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-muted group-hover:text-neon-green group-hover:translate-x-1 transition-all duration-300">
                        Explore →
                      </span>
                    </div>

                    {/* Bottom beam */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className={`w-full h-full bg-gradient-to-r ${product.gradient}`}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
