import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, ImageOff } from "lucide-react";
import { useBrand } from "@/contexts";

interface TestimonialData {
  quote: string;
  attribution: string;
  title?: string;
  company?: string;
  image?: string;
  imageAlt?: string;
}

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ctx = useBrand();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Use brand testimonials if available
  const brandTestimonials = ctx.brand.testimonials as TestimonialData[] | undefined;
  const testimonial = brandTestimonials?.[0];
  const hasTestimonial = !!testimonial;

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Build attribution line safely - no "undefined" rendering
  const attributionLine = [testimonial?.title, testimonial?.company]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="section-padding bg-section-alt" ref={ref} aria-labelledby="testimonials-heading">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          {/* Section heading for orientation - higher contrast for dark background */}
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4 }}
            className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-foreground mb-8 text-center"
          >
            {hasTestimonial ? "Trusted by Our Clients" : "What Our Clients Say"}
          </motion.h2>

          {hasTestimonial ? (
            <>
              {/* Testimonial - high emphasis cameo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <Quote className="w-10 h-10 text-foreground mx-auto mb-3" aria-hidden="true" />
                <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed max-w-3xl mx-auto mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-lg text-foreground">
                    {testimonial.attribution}
                  </p>
                  {attributionLine && (
                    <p className="text-base text-muted-foreground">
                      {attributionLine}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Testimonial Image - Display if available */}
              {testimonial.image && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-2xl mx-auto mb-12"
                >
                  <div className="relative group overflow-hidden rounded-xl shadow-card aspect-[4/3]">
                    {imageErrors[0] ? (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <ImageOff className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
                      </div>
                    ) : (
                      <img
                        src={testimonial.image}
                        alt={testimonial.imageAlt || "Customer testimonial image"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={() => handleImageError(0)}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Product showcase - portrait display matching source image aspect ratio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8"
              >
                {/* Image 1 */}
                <div className="relative group overflow-hidden rounded-xl shadow-card aspect-[4/3]">
                  {imageErrors[0] ? (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <ImageOff className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
                    </div>
                  ) : (
                    <img
                      src="/commercial-printing/images/talent-on-parade-booklet-4.jpg"
                      alt="Talent On Parade Des Moines booklet - printed by Broadstroke"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: 'center center', transform: 'scale(1.3)' }}
                      loading="lazy"
                      onError={() => handleImageError(0)}
                    />
                  )}
                </div>
                {/* Image 2 */}
                <div className="relative group overflow-hidden rounded-xl shadow-card aspect-[4/3]">
                  {imageErrors[1] ? (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <ImageOff className="w-12 h-12 text-muted-foreground" aria-hidden="true" />
                    </div>
                  ) : (
                    <img
                      src="/commercial-printing/images/talent-on-parade-booklet-7.jpg"
                      alt="Talent On Parade Des Moines booklet detail - printed by Broadstroke"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ objectPosition: 'center center', transform: 'scale(1.3)' }}
                      loading="lazy"
                      onError={() => handleImageError(1)}
                    />
                  )}
                </div>
              </motion.div>


            </>
          ) : (
            /* Fallback when no testimonial data available */
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Client testimonials coming soon.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Contact us to learn why businesses trust Broadstroke.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
