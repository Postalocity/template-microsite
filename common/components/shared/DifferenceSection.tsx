import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Eye, Zap, Sparkles } from "lucide-react";
import { sanitizeHtml } from "../../utils/sanitize-html";

const differentials = [
  {
    icon: Mail,
    title: "Every Mailer Includes an Envelope",
    description:
      "We use real envelopes—not loose paper sealed with a sticker. Every statement is professionally printed, folded, stuffed into an envelope, sealed, and mailed.",
  },
  {
    icon: Eye,
    title: "Mail Visibility",
    description:
      "Tracking available on Priority Mail and Certified Mail. First-Class Mail (standard) does not include tracking. Signature tracking on Certified Mail available for additional fee.",
  },
  {
    icon: Zap,
    title: "Skip USPS Drop Boxes & Cutoffs",
    description:
      "Bypass post office drop-off times and waiting in line. We automate the process—eliminating missed cutoffs and potentially days in delivery time.",
  },
];

const DifferenceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="difference"
      className="section-padding bg-section-alt"
      ref={ref}
      style={{ backgroundColor: "#333333" }}
    >
      <div className="section-container">
        {/* Section header with sparkle icon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-amber-700/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white text-sm font-medium tracking-wide uppercase">
              Why Choose Postalocity
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            The <span className="text-primary">Postalocity</span> Difference
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover why 500+ healthcare providers trust our mailing service for
            patient communications
          </p>
        </motion.div>

        {/* Cards with dramatic effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="group"
            >
              <div
                className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-2"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-amber-400/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="relative w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <item.icon
                      className="w-8 h-8 text-secondary"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p
                    className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
                  />
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-sm">
            Trusted by 500+ healthcare providers nationwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferenceSection;
