import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Clock } from 'lucide-react';
import { CaseStudiesContent } from '../../types/content';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudiesContent;
}

const CaseStudiesSection = ({ caseStudies }: CaseStudiesSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <section
      id="case-studies"
      ref={ref}
      className="py-24 bg-background/50 border-t border-border"
      aria-labelledby="case-studies-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="case-studies-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {caseStudies.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {caseStudies.section.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.caseStudies.map((study, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`bg-card/50 border-2 border-border rounded-2xl overflow-hidden transition-all ${
                expandedCase === idx ? 'border-primary/50' : 'hover:border-primary/30'
              }`}
            >
              {/* Case Study Header */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {study.client.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {study.client.industry} • {study.client.size} • {study.client.location}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-6 h-6 text-primary transition-transform ${
                      expandedCase === idx ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{study.timeline}</span>
                </div>

                {/* Snapshot */}
                <p className="text-foreground leading-relaxed">{study.outcome}</p>
              </div>

              {/* Expanded Details */}
              <AnimatePresence mode="wait">
                {expandedCase === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-8"
                  >
                    {/* Metrics */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Key Results
                      </h4>
                      <div className="space-y-3">
                        {study.metrics.map((metric, mIdx) => (
                          <div
                            key={mIdx}
                            className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {metric.category}
                            </span>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-muted-foreground line-through">
                                {metric.before}
                              </span>
                              <ArrowRight className="w-4 h-4 text-primary" />
                              <span className="font-bold text-primary">{metric.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Methodology */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-foreground mb-3">
                        Methodology
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{study.methodology}</p>
                    </div>

                    {/* Testimonial */}
                    {study.testimonial && (
                      <div className="mb-6 bg-card/50 rounded-xl p-4 border border-border">
                        <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Testimonial
                        </h4>
                        <p className="text-muted-foreground leading-relaxed italic">
                          "{study.testimonial}"
                        </p>
                      </div>
                    )}

                    {/* Evidence */}
                    {study.evidence && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-3">
                          Evidence & Documentation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {study.evidence.beforeImage && (
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                              Before photo available
                            </span>
                          )}
                          {study.evidence.afterImage && (
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                              After photo available
                            </span>
                          )}
                          {study.evidence.documents && study.evidence.documents.length > 0 && (
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {study.evidence.documents.length} supporting documents
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand Button */}
              <button
                onClick={() => setExpandedCase(expandedCase === idx ? null : idx)}
                className="w-full px-8 py-4 border-t border-border text-center hover:bg-primary/5 transition-all text-sm font-medium"
                aria-expanded={expandedCase === idx}
              >
                {expandedCase === idx ? 'See Less' : 'See Full Case Study'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;