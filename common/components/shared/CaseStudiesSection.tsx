import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CaseStudiesContent } from "../../types/content";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";

interface CaseStudiesSectionProps {
  caseStudies: CaseStudiesContent;
}

const CaseStudiesSection = ({ caseStudies }: CaseStudiesSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!caseStudies?.section) {
    return null;
  }

  const { caseStudies: studies } = caseStudies;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="case-studies" className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {caseStudies.section.title}
          </h2>
          {caseStudies.section.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {caseStudies.section.description}
            </p>
          )}
        </motion.div>

        {studies && studies.length > 0 && (
          <div className="space-y-6">
            {studies.map((study, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="p-6">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <CardTitle className="text-xl mb-1">
                            {study.client.name}
                          </CardTitle>
                          <CardDescription>
                            {study.client.industry}
                            {study.client.size && ` • ${study.client.size}`}
                            {study.client.location && ` • ${study.client.location}`}
                          </CardDescription>
                        </div>
                        <button
                          onClick={() => toggleExpand(idx)}
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <span className="text-sm font-medium">
                            {isExpanded ? "Show Less" : "Show More"}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Metrics Grid */}
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {study.metrics.map((metric, midx) => (
                            <div
                              key={midx}
                              className="bg-muted/50 rounded-lg p-4 text-center"
                            >
                              <p className="text-sm text-muted-foreground mb-1">
                                {metric.category}
                              </p>
                              <div className="flex items-center justify-center gap-2 mb-1">
                                {metric.delta && metric.delta.includes("reduce") || metric.delta.includes("saved") ? (
                                  <TrendingDown className="w-4 h-4 text-green-500" />
                                ) : (
                                  <TrendingUp className="w-4 h-4 text-green-500" />
                                )}
                                <span className="text-lg font-bold text-foreground">
                                  {metric.after}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                From {metric.before}
                              </p>
                              {metric.delta && (
                                <Badge variant="secondary" className="mt-2 text-xs">
                                  {metric.delta}
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Expanded Content */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 pt-4 border-t"
                        >
                          {study.methodology && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Methodology
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {study.methodology}
                              </p>
                            </div>
                          )}

                          {study.timeline && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Timeline
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {study.timeline}
                              </p>
                            </div>
                          )}

                          {study.outcome && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">
                                Outcome
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {study.outcome}
                              </p>
                            </div>
                          )}

                          {study.testimonial && (
                            <div className="bg-primary/5 rounded-lg p-4">
                              <p className="text-sm text-foreground italic">
                                "{study.testimonial}"
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
