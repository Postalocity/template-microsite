import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Postalocity eliminated two full days of manual mailing work per month from our administrative workflow. Staff can now focus on calling patients and resolving billing issues.",
    name: "Sarah Mitchell",
    title: "Practice Manager",
    institution: "Midwest Orthopedic Group, Chicago IL",
    metrics: "40+ hours reclaimed monthly",
  },
  {
    quote:
      "Our returned mail rate dropped from 12% to under 4% after adding NCOA verification. Patient collection rates improved 22% in the first quarter.",
    name: "James Chen",
    title: "Billing Director",
    institution: "Valley Family Health, Salem OR",
    metrics: "22% improvement in collections",
  },
  {
    quote:
      "Implementation was effortless— uploaded our first patient statement file on Monday, received confirmation by end of day, and statements mailed the next morning.",
    name: "Maria Rodriguez",
    title: "Office Manager",
    institution: "Phoenix Dental Associates, Phoenix AZ",
    metrics: "Setup in 3 business days",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by 500+ Healthcare Providers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what healthcare administrators are saying about Postalocity
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto mt-2">
            *Testimonial names and details are representative examples of
            typical customer experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card h-full flex flex-col">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <blockquote className="text-foreground flex-grow mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.institution}
                  </p>
                  <p className="text-primary font-bold text-sm mt-2">
                    {testimonial.metrics}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
