import Hero from '@/components/landing/Hero';
import dynamic from 'next/dynamic';

// Lazy load all below-fold sections — Hero is the only critical above-fold content
const ProblemStatement = dynamic(() => import('@/components/landing/ProblemStatement'), {
  loading: () => <div className="min-h-[50vh]" />,
});
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'), {
  loading: () => <div className="min-h-[50vh]" />,
});
const FeatureModules = dynamic(() => import('@/components/landing/FeatureModules'), {
  loading: () => <div className="min-h-[50vh]" />,
});
const MembershipPreview = dynamic(() => import('@/components/landing/MembershipPreview'), {
  loading: () => <div className="min-h-[40vh]" />,
});
const ImpactStats = dynamic(() => import('@/components/landing/ImpactStats'), {
  loading: () => <div className="min-h-[30vh]" />,
});
const BeforeAfterReveal = dynamic(() => import('@/components/landing/BeforeAfterReveal'), {
  loading: () => <div className="min-h-[40vh]" />,
});
const CTASection = dynamic(() => import('@/components/landing/CTASection'), {
  loading: () => <div className="min-h-[30vh]" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <FeatureModules />
      <MembershipPreview />
      <ImpactStats />
      <BeforeAfterReveal 
        beforeImage="/before-impact.png" 
        afterImage="/after-impact.png" 
      />
      <CTASection />
    </>
  );
}
