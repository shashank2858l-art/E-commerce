'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const MARKETPLACE_URL = 'https://e-commerce-frontend-seven-blond.vercel.app/marketplace';

interface ProductData {
  name: string;
  emoji: string;
  price: string;
  tagline: string;
  gradient: string;
  glowColor: string;
  heroDescription: string;
  features: { icon: string; title: string; desc: string }[];
  specs: { label: string; value: string }[];
  storyCards: { title: string; desc: string; icon: string }[];
}

const productMap: Record<string, ProductData> = {
  'mountain-bike': {
    name: 'Mountain Bike',
    emoji: '🚴',
    price: '$899',
    tagline: 'Built to conquer any terrain',
    gradient: 'from-accent-teal to-neon-green',
    glowColor: 'rgba(13,255,198,0.15)',
    heroDescription: 'Experience the thrill of off-road cycling with our premium pre-owned mountain bike. Certified, inspected, and ready for your next adventure — with zero new manufacturing waste.',
    features: [
      { icon: '⚡', title: 'Carbon Fiber Frame', desc: 'Lightweight yet incredibly durable construction' },
      { icon: '🏔️', title: 'All-Terrain Ready', desc: '29-inch wheels with hydraulic disc brakes' },
      { icon: '♻️', title: 'Eco-Certified', desc: 'Reused — saving 72kg of CO₂ vs buying new' },
    ],
    specs: [
      { label: 'Frame', value: 'Carbon Fiber' },
      { label: 'Wheels', value: '29" Alloy' },
      { label: 'Brakes', value: 'Hydraulic Disc' },
      { label: 'Gears', value: '12-Speed Shimano' },
      { label: 'Weight', value: '11.2 kg' },
      { label: 'CO₂ Saved', value: '72 kg' },
    ],
    storyCards: [
      { title: 'Previous Life', icon: '📍', desc: 'This bike explored 2,400km of trails across the Pacific Northwest before finding a new home.' },
      { title: 'Certified Quality', icon: '✅', desc: '47-point inspection completed. New brake pads, derailleur tuned, frame verified crack-free.' },
      { title: 'Your Impact', icon: '🌍', desc: 'By choosing reused, you save 72kg CO₂ and prevent 15kg of manufacturing waste.' },
    ],
  },
  'gaming-chair': {
    name: 'Gaming Chair',
    emoji: '🎮',
    price: '$399',
    tagline: 'Ergonomic comfort for champions',
    gradient: 'from-accent-purple to-accent-teal',
    glowColor: 'rgba(191,90,242,0.15)',
    heroDescription: 'Premium ergonomic gaming chair, gently pre-loved and professionally reconditioned. Same comfort, fraction of the environmental cost.',
    features: [
      { icon: '🪑', title: '4D Armrests', desc: 'Fully adjustable in every direction for perfect positioning' },
      { icon: '💆', title: 'Lumbar Support', desc: 'Adjustable lumbar and headrest for all-day comfort' },
      { icon: '♻️', title: 'Eco-Certified', desc: 'Reused — saving 45kg of CO₂ vs buying new' },
    ],
    specs: [
      { label: 'Material', value: 'PU Leather + Mesh' },
      { label: 'Max Load', value: '150 kg' },
      { label: 'Recline', value: '90°-165°' },
      { label: 'Armrests', value: '4D Adjustable' },
      { label: 'Base', value: 'Aluminum Alloy' },
      { label: 'CO₂ Saved', value: '45 kg' },
    ],
    storyCards: [
      { title: 'Previous Life', icon: '📍', desc: 'Used by a content creator for 14 months. Professionally cleaned with new gas lift installed.' },
      { title: 'Certified Quality', icon: '✅', desc: 'Full inspection — upholstery deep-cleaned, all mechanisms tested, new caster wheels fitted.' },
      { title: 'Your Impact', icon: '🌍', desc: 'You save 45kg CO₂ and prevent 8kg of plastic waste from entering landfills.' },
    ],
  },
  'iphone': {
    name: 'iPhone 17 Pro',
    emoji: '📱',
    price: '$1,199',
    tagline: 'The future in your hand',
    gradient: 'from-neon-green to-accent-gold',
    glowColor: 'rgba(57,255,20,0.15)',
    heroDescription: 'Grade-A refurbished iPhone 17 Pro. Indistinguishable from new, with full warranty and a dramatically smaller carbon footprint.',
    features: [
      { icon: '📸', title: '48MP Pro Camera', desc: 'Triple-lens system with ProRAW and 5x optical zoom' },
      { icon: '🧠', title: 'A18 Pro Chip', desc: 'Fastest mobile processor ever made' },
      { icon: '♻️', title: 'Eco-Certified', desc: 'Reused — saving 95kg of CO₂ vs buying new' },
    ],
    specs: [
      { label: 'Display', value: '6.7" Super Retina XDR' },
      { label: 'Storage', value: '256 GB' },
      { label: 'Battery', value: '97% Health' },
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Grade', value: 'A+ (Like New)' },
      { label: 'CO₂ Saved', value: '95 kg' },
    ],
    storyCards: [
      { title: 'Previous Life', icon: '📍', desc: 'Purchased 6 months ago, kept in a case. Traded in for the latest color — your gain.' },
      { title: 'Certified Quality', icon: '✅', desc: 'Grade A+ refurbished. Battery at 97% health. Zero scratches. Full factory reset.' },
      { title: 'Your Impact', icon: '🌍', desc: 'You prevent 95kg CO₂ and avoid extracting rare earth minerals from vulnerable ecosystems.' },
    ],
  },
};

export default function ExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.product as string;
  const product = productMap[slug];
  const [phase, setPhase] = useState<'intro' | 'content'>('intro');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('content'), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/" className="text-neon-green hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed top-6 left-6 z-50"
      >
        <button
          onClick={() => router.push('/')}
          className="group glass px-4 py-2.5 rounded-xl border border-white/10 hover:border-neon-green/40 transition-all duration-300 flex items-center gap-2 text-sm font-heading font-semibold tracking-wider hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Home
        </button>
      </motion.div>

      {/* Intro Animated Text */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.span
                className="text-6xl sm:text-7xl block mb-6"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                {product.emoji}
              </motion.span>
              <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
                Experience the{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                  {product.name}
                </span>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className={`h-1 w-32 mx-auto mt-6 rounded-full bg-gradient-to-r ${product.gradient} origin-left`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {phase === 'content' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative pt-24 pb-16">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${product.glowColor}, transparent 60%)` }}
            />
            <div className="section-container relative z-10 text-center max-w-4xl mx-auto">
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="text-7xl sm:text-8xl lg:text-9xl block mb-8"
              >
                {product.emoji}
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1]"
              >
                {product.name}
                <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                  {product.tagline}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-muted text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed"
              >
                {product.heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-10 flex justify-center"
              >
                <span className={`font-heading text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${product.gradient} drop-shadow-[0_0_20px_${product.glowColor}]`}>
                  {product.price}
                </span>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 relative">
            <div className="section-container">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12"
              >
                What Makes It{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                  Special
                </span>
              </motion.h2>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {product.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="glass rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{feature.icon}</span>
                    <h3 className="font-heading text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-dim leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Story Cards Section */}
          <section className="py-20 relative">
            <div className="section-container">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4"
              >
                The{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                  Story
                </span>{' '}
                Behind It
              </motion.h2>
              <p className="text-center text-muted mb-12 max-w-xl mx-auto">
                Every pre-owned product has a journey. Here&apos;s this one&apos;s.
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                {product.storyCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="glass rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-neon-green/30 transition-all duration-300 group"
                  >
                    <span className="text-3xl block mb-3">{card.icon}</span>
                    <h3 className="font-heading text-base font-bold mb-2 text-white">{card.title}</h3>
                    <p className="text-sm text-muted-dim leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Specs Section */}
          <section className="py-20 relative">
            <div className="section-container max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12"
              >
                Technical{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                  Specs
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl border border-white/10 overflow-hidden"
              >
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-6 py-4 ${i < product.specs.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}
                  >
                    <span className="text-sm text-muted font-heading tracking-wider uppercase">{spec.label}</span>
                    <span className="text-sm font-heading font-bold text-white">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Buy Now Section */}
          <section className="py-24 relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at bottom, ${product.glowColor}, transparent 50%)` }}
            />
            <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16"
              >
                <span className="text-5xl block mb-6">{product.emoji}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black mb-4">
                  Ready to Own This{' '}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                    {product.name}
                  </span>
                  ?
                </h2>
                <p className="text-muted mb-8 max-w-lg mx-auto">
                  Join the circular economy. Buy smarter, save the planet, and get premium quality at a fraction of the cost.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href={MARKETPLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex justify-center items-center gap-3 w-full sm:w-auto px-10 py-5 font-heading text-sm font-black tracking-[0.15em] uppercase bg-neon-green text-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_50px_rgba(57,255,20,0.5)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      🛒 Buy Now — {product.price}
                    </span>
                  </a>

                  <button
                    onClick={() => router.push('/')}
                    className="w-full sm:w-auto px-8 py-5 font-heading text-sm font-bold tracking-[0.1em] uppercase text-white glass border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-300"
                  >
                    ← Back to Home
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}

      {/* Sticky Buy Now Bar (appears on scroll) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 px-4 py-3 sm:py-4 backdrop-blur-xl"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{product.emoji}</span>
            <div className="hidden sm:block">
              <span className="font-heading text-sm font-bold">{product.name}</span>
              <span className={`font-heading text-lg font-black ml-3 text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                {product.price}
              </span>
            </div>
            <span className={`sm:hidden font-heading text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
              {product.price}
            </span>
          </div>
          <a
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neon-green text-black font-heading text-xs font-black tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all hover:-translate-y-0.5"
          >
            Buy Now
          </a>
        </div>
      </motion.div>
    </div>
  );
}
