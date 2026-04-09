import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ComparisonChartContent } from "../../types/content";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Clock, TrendingUp } from "lucide-react";

interface ComparisonChartSectionProps {
  comparison: ComparisonChartContent;
}

const ComparisonChartSection = ({ comparison }: ComparisonChartSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!comparison?.chart) {
    return null;
  }

  const { chart } = comparison;
  const maxTime = Math.max(chart.totalTimeInHouse, chart.totalTimePostalocity);

  return (
    <section id="comparison-chart" className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {comparison.section.title}
          </h2>
          {comparison.section.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {comparison.section.description}
            </p>
          )}
        </motion.div>

        {/* Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-6">
              <div className="space-y-8">
                {/* In-House Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">Traditional In-House</span>
                    <span className="text-destructive font-bold">{chart.totalTimeInHouse} hours</span>
                  </div>
                  <div className="h-8 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(chart.totalTimeInHouse / maxTime) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-destructive/60 rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{chart.redBarPercentage}% longer processing time</span>
                  </div>
                </div>

                {/* Postalocity Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">Postalocity Automated</span>
                    <span className="text-primary font-bold">{chart.totalTimePostalocity} hours</span>
                  </div>
                  <div className="h-8 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(chart.totalTimePostalocity / maxTime) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-primary">
                    <TrendingUp className="w-4 h-4" />
                    <span>Time savings of {chart.totalTimeInHouse - chart.totalTimePostalocity} hours</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Breakdown Sections */}
            {chart.sections && chart.sections.length > 0 && (
              <div className="px-6 pb-6">
                <h3 className="font-semibold text-foreground mb-4">Processing Breakdown</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chart.sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{section.name}</CardTitle>
                          <CardDescription className="space-y-1">
                            <p className="text-destructive">
                              In-House: {section.inHouseTime} hrs
                            </p>
                            <p className="text-primary font-medium">
                              Postalocity: {section.postalocityTime} hrs
                            </p>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonChartSection;
