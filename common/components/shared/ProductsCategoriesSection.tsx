import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductsCategoriesContent } from "../../types/content";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ChevronRight } from "lucide-react";

interface ProductsCategoriesSectionProps {
  products: ProductsCategoriesContent;
}

const ProductsCategoriesSection = ({ products }: ProductsCategoriesSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!products?.section || !products?.categories) {
    return null;
  }

  return (
    <section id="products" className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {products.section.title}
          </h2>
          {products.section.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {products.section.description}
            </p>
          )}
        </motion.div>

        <div className="space-y-12">
          {products.categories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {category.name}
              </h3>

              {category.scents && category.scents.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.scents.map((scent, scentIdx) => (
                    <motion.div
                      key={scentIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.2 + scentIdx * 0.05 }}
                    >
                      <Card className="h-full hover:border-primary/50 transition-colors group">
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {scent.name}
                            </CardTitle>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          {scent.description && (
                            <CardDescription className="text-sm mt-1">
                              {scent.description}
                            </CardDescription>
                          )}
                          {scent.season && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Best for: {scent.season}
                            </p>
                          )}
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCategoriesSection;
