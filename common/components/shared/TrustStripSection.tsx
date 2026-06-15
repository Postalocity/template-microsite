import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TrustBadge {
  label: string;
  status: string;
}

interface TrustStripSectionProps {
  label?: string;
  badges?: TrustBadge[];
}

const defaultBadges: TrustBadge[] = [
  { label: 'USPS', status: 'Verified' },
  { label: 'NCOA', status: 'Verified' },
  { label: 'CASS', status: 'Certified' },
];

const TrustStripSection = ({
  label = 'PROFESSIONAL HEALTHCARE MAILING',
  badges = defaultBadges,
}: TrustStripSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section ref={ref} className="section-padding py-8 bg-background border-b border-border/40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <p className="text-lg sm:text-xl font-bold text-foreground uppercase tracking-wider">
            {label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {badges.map((badge) => (
              <div
                key={`${badge.label}-${badge.status}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                <span className="text-sm font-bold text-foreground">{badge.label}</span>
                <span className="text-xs text-muted-foreground">{badge.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStripSection;