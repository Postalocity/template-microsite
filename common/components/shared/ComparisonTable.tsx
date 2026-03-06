import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import envelopeSample from "@/assets/envelope-sample.svg";

const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="comparison"
      className="section-padding bg-section-alt"
      ref={ref}
    >
      <div className="section-container">
        <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-card p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              In-House vs Postalocity Automation
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See why regional hospitals, urgent care centers, and medical
              practices trust Postalocity over manual processing
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr>
                  <th className="w-1/3"></th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold border border-border bg-destructive/10 rounded-t-lg">
                    In-House / Manual
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold border border-border bg-primary/10 rounded-t-lg">
                    Postalocity Automation
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Turnaround time
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    3 – 5 days
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-primary border border-border">
                    24 hours
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Same-day option
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    <X className="w-5 h-5 mx-auto text-destructive" />
                  </td>
                  <td className="py-4 px-4 text-center text-primary border border-border">
                    <Check className="w-5 h-5 mx-auto" /> Upload by 3 PM, mailed
                    by 5 PM
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    EMR Integration
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    Manual export
                  </td>
                  <td className="py-4 px-4 text-center text-primary border border-border">
                    <Check className="w-5 h-5 mx-auto" /> API + no-code
                    connectors
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Cost per statement
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    $1.20 – $3.50
                  </td>
                  <td className="py-4 px-4 text-center border border-border">
                    <span className="font-semibold text-primary">$1.31</span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      Full color envelope and postage included
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    USPS Tracking
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    <X className="w-5 h-5 mx-auto text-destructive" />
                  </td>
                  <td className="py-4 px-4 text-center text-primary border border-border">
                    <Check className="w-5 h-5 mx-auto" /> Real-time USPS
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Volumes handled
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    Limited by staff
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-primary border border-border">
                    5,000-100,000+/month
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Address accuracy
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    Manual errors
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-primary border border-border">
                    NCOA/CASS auto-verify
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Compliance
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    Manual tracking
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-primary border border-border">
                    ISO 9001 documented
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Staff time
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    Full team
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-primary border border-border">
                    Zero – upload & done
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-foreground font-medium">
                    Color Envelope
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                    —
                  </td>
                  <td className="py-4 px-4 text-center border border-border">
                    <img
                      src={envelopeSample}
                      alt="Color envelope sample"
                      className="w-44 mx-auto rounded-lg"
                    />
                    <p className="mt-2 font-bold text-foreground text-sm">
                      Color Envelope Option
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Make your statements stand out in the mail
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href="https://prod.postalocity.com/login.html?signUp=true&promo=health2026"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-cta-gold text-lg"
            >
              Get Started Today!
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
