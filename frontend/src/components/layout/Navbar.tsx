'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import Logo from '../common/Logo';

import { supabase } from '@/utils/supabase';

const navKeys = [
  { href: '/', labelKey: 'nav_home' },
  { href: '/about', labelKey: 'nav_about' },
  { href: '/marketplace', labelKey: 'nav_market' },
  { href: process.env.NEXT_PUBLIC_HOT_DEALS_API_URL || 'http://localhost:3001', labelKey: 'nav_new_appearance', external: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Check initial theme
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') {
        setIsLightMode(true);
        document.documentElement.classList.add('theme-light');
      }
    }
    // Auth state hook
    const updateSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      if (data.session?.user) {
        localStorage.setItem('reuse_mart_current_user', data.session.user.id);
      } else {
        localStorage.removeItem('reuse_mart_current_user');
      }
    };
    updateSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        localStorage.setItem('reuse_mart_current_user', session.user.id);
      } else {
        localStorage.removeItem('reuse_mart_current_user');
      }
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.documentElement.classList.remove('theme-light');
      localStorage.setItem('theme', 'dark');
      setIsLightMode(false);
    } else {
      document.documentElement.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('reuse_mart_current_user');
    setIsAuthenticated(false);
    setProfileOpen(false);
    router.push('/');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-background/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between h-16 gap-2 sm:gap-4 lg:gap-6">
        
        {/* LEFT ZONE: Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        {/* CENTER ZONE: Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-1 lg:gap-3 xl:gap-4 whitespace-nowrap overflow-hidden">
          {navKeys.map((link) => {
            const isExternal = !!(link as any).external;
            const LinkTag = isExternal ? 'a' : Link;
            const linkProps = isExternal
              ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: link.href };

            return (
              <LinkTag
                key={link.href}
                {...(linkProps as any)}
                onMouseEnter={() => setHoveredPath(link.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className={`relative px-3 lg:px-4 py-2 text-[11px] lg:text-xs xl:text-sm font-heading font-semibold tracking-widest uppercase transition-colors rounded-lg z-10 flex items-center gap-1.5 ${
                  isExternal
                    ? 'text-amber-400 hover:text-amber-300'
                    : pathname === link.href
                    ? 'text-neon-green drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]'
                    : 'text-muted-dim hover:text-white'
                }`}
              >
                {hoveredPath === link.href && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isExternal && (
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="text-sm"
                  >
                    ✦
                  </motion.span>
                )}
                {t(link.labelKey)}
                {isExternal && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-60">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
                {!isExternal && pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-neon-green rounded-full shadow-[0_0_10px_rgba(57,255,20,0.8)]"
                  />
                )}
              </LinkTag>
            );
          })}
        </div>

        {/* RIGHT ZONE: Actions (Wishlist, Cart, Profile) + Utilities */}
        <div className="flex items-center justify-end gap-2 lg:gap-3 flex-shrink-0">
          
          {/* Utilities: Hidden on small mobiles */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-white/10 glass hover:bg-white/10 transition-colors text-white"
              title="Toggle Light/Dark Mode"
            >
              {isLightMode ? '🌙' : '☀️'}
            </button>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-surface-high text-foreground text-xs border border-white/10 rounded-lg px-2 py-1.5 outline-none cursor-pointer focus:border-neon-green/50 transition-colors"
            >
              <option value="en" className="bg-surface-high text-foreground">English</option>
              <option value="hi" className="bg-surface-high text-foreground">हिंदी (HI)</option>
              <option value="kn" className="bg-surface-high text-foreground">ಕನ್ನಡ (KN)</option>
            </select>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-surface-high text-foreground text-xs border border-white/10 rounded-lg px-2 py-1.5 outline-none cursor-pointer focus:border-neon-green/50 transition-colors"
            >
              <option value="INR" className="bg-surface-high text-foreground">₹ INR</option>
              <option value="USD" className="bg-surface-high text-foreground">$ USD</option>
            </select>
          </div>

          {!isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 10px rgba(57,255,20,0.2)', '0 0 25px rgba(57,255,20,0.5)', '0 0 10px rgba(57,255,20,0.2)'] }}
              transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
              onClick={() => {
                alert('Please log in first to create listings or explore your items!');
                window.location.href = '/login';
              }}
              className="hidden md:inline-flex items-center gap-2 px-3 lg:px-4 py-2 text-[10px] lg:text-xs font-heading font-bold tracking-widest uppercase bg-neon-green text-black rounded-lg transition-colors border border-transparent hover:border-white/50 whitespace-nowrap"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              {t('nav_list')}
            </motion.button>
          )}

          {/* User Actions */}
          {isAuthenticated && (
            <div className="flex items-center gap-1 sm:gap-2 relative">
              <Link href="/wishlist" className="relative p-2 text-muted-dim hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] transition-all group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              
              <Link href="/cart" className="relative p-2 text-muted-dim hover:text-neon-green hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] transition-all group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform">
                  <circle cx="9" cy="21" r="1.5" />
                  <circle cx="20" cy="21" r="1.5" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {/* Visual Fake Badge indicator */}
                <span className="absolute top-0 right-0 w-[18px] h-[18px] text-[10px] bg-neon-green text-black font-bold flex items-center justify-center rounded-full border border-background">
                  2
                </span>
              </Link>

              {/* Profile Avatar & Dropdown */}
              <div className="relative ml-1 sm:ml-2" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-[2px] rounded-full border-2 border-transparent hover:border-neon-green transition-colors overflow-hidden focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-neon-green font-bold text-sm shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-48 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl py-2 flex flex-col z-50 overflow-hidden"
                    >
                      <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="px-4 py-2.5 hover:bg-white/5 hover:text-neon-green transition-colors text-sm font-medium flex items-center gap-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                        Dashboard
                      </Link>
                      <Link href="/membership" onClick={() => setProfileOpen(false)} className="px-4 py-2.5 hover:bg-white/5 hover:text-neon-green transition-colors text-sm font-medium flex items-center gap-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        Membership
                      </Link>
                      <div className="h-px bg-white/10 my-1 mx-2" />
                      <button onClick={handleLogout} className="px-4 py-2.5 text-left text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium flex items-center gap-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-white transition-colors flex-shrink-0 ml-1"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>
              )}
            </svg>
          </button>
          
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden bg-background/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl relative"
          >
            <div className="flex flex-col px-4 pt-2 pb-6 gap-2">
              <div className="flex items-center gap-4 mb-4 mt-2 sm:hidden justify-center bg-white/5 py-3 rounded-xl">
                 <button onClick={toggleTheme} className="p-2 rounded-lg border border-white/10 glass hover:bg-white/10 transition-colors text-white text-sm" title="Toggle Light/Dark Mode">
                   {isLightMode ? '🌙' : '☀️'}
                 </button>
                 <select value={lang} onChange={(e) => setLang(e.target.value as any)} className="bg-transparent text-foreground text-sm outline-none cursor-pointer">
                   <option value="en">English</option>
                   <option value="hi">हिंदी</option>
                   <option value="kn">ಕನ್ನಡ</option>
                 </select>
                 <select value={currency} onChange={(e) => setCurrency(e.target.value as any)} className="bg-transparent text-foreground text-sm outline-none cursor-pointer">
                   <option value="INR">₹ INR</option>
                   <option value="USD">$ USD</option>
                 </select>
              </div>

              {navKeys.map((link, i) => {
                const isExternal = !!(link as any).external;
                const LinkTag = isExternal ? 'a' : Link;
                const linkProps = isExternal
                  ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: link.href };

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <LinkTag
                      {...(linkProps as any)}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-semibold tracking-widest uppercase text-sm shadow-sm ${
                        isExternal
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : pathname === link.href
                          ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                          : 'text-muted-dim hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {isExternal && <span className="text-sm">✦</span>}
                      {t(link.labelKey)}
                      {isExternal && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-60 ml-auto">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      )}
                    </LinkTag>
                  </motion.div>
                );
              })}

              {!isAuthenticated && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    setMobileOpen(false);
                    window.location.href = '/login';
                  }}
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-heading font-bold tracking-widest uppercase bg-neon-green text-black rounded-xl shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                >
                  Login to List Items
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
