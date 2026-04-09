import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrandStoryContent } from "../../types/content";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Quote } from "lucide-react";

interface BrandStorySectionProps {
  brandStory: BrandStoryContent;
}

const BrandStorySection = ({ brandStory }: BrandStorySectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!brandStory?.section) {
    return null;
  }

  return (
    <section id="brand-story" className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {brandStory.section.title}
          </h2>
          {brandStory.section.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {brandStory.section.description}
            </p>
          )}
        </motion.div>

        {/* Origin Story */}
        {brandStory.origin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="w-6 h-6 text-primary" />
                  <span className="text-sm text-primary font-medium">Our Story</span>
                </div>
                <CardDescription className="text-lg text-foreground leading-relaxed">
                  {brandStory.origin}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}

        {/* Timeline */}
        {brandStory.timeline && brandStory.timeline.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-xl font-bold text-center mb-8">Our Journey</h3>
            <div className="space-y-6">
              {brandStory.timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                >
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl font-bold text-primary">{item.year}</span>
                        </div>
                        <div>
                          <CardTitle className="text-base">{item.event}</CardTitle>
                          {item.description && (
                            <CardDescription className="text-sm mt-1">
                              {item.description}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Philosophy */}
        {brandStory.philosophy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Our Philosophy</CardTitle>
                <CardDescription className="text-lg text-foreground italic">
                  "{brandStory.philosophy}"
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BrandStorySection;
