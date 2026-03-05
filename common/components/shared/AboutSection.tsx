import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Clock, ShieldCheck } from 'lucide-react';
import { AboutContent } from '../../types/content';

interface AboutSectionProps {
  about: AboutContent;
}

const AboutSection = ({ about }: AboutSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-background/50 border-t border-border"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {about.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {about.section.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-card/50 border-2 border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {about.mission}
            </p>
          </div>

          <div className="bg-card/50 border-2 border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              Our Values
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {about.values.map((value, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mr-2">✓</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Credentials & Certifications */}
        {about.credentials && about.credentials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Credentials & Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {about.credentials.map((cred, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card/50 border-2 border-border rounded-xl p-6 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {cred.type === 'certification' && <Award className="w-6 h-6 text-primary" />}
                    {cred.type === 'accreditation' && <ShieldCheck className="w-6 h-6 text-primary" />}
                    {cred.type === 'license' && <Users className="w-6 h-6 text-primary" />}
                    {cred.type === 'award' && <Clock className="w-6 h-6 text-primary" />}
                    <span className="font-semibold text-foreground">{cred.name}</span>
                  </div>
                  {cred.issuer && (
                    <p className="text-sm text-muted-foreground">{cred.issuer}</p>
                  )}
                  {cred.year && (
                    <p className="text-xs text-muted-foreground mt-1">{cred.year}</p>
                  )}
                  {cred.verified && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary bg-primary/10 inline-block px-2 py-1 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Expert Team */}
        {about.experts && about.experts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Our Expert Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.experts.map((expert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card/50 border-2 border-border rounded-2xl p-6 hover:border-primary/30 transition-all"
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-foreground mb-1">
                      {expert.name}
                    </h4>
                    <p className="text-primary font-medium">{expert.title}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.credentials.map((cred, credIdx) => (
                      <span
                        key={credIdx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {expert.bio}
                  </p>
                  {expert.experience && (
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      Experience: {expert.experience}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;