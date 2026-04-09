import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AboutContent } from "../../types/content";
import { getIcon } from "../../utils/icons";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";

interface AboutSectionProps {
  about: AboutContent;
}

const AboutSection = ({ about }: AboutSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!about?.section) {
    return null;
  }

  const { company, mission, values, experts, credentials } = about;

  return (
    <section id="about" className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {about.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {about.section.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          {company && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">About Us</CardTitle>
                  <CardDescription className="space-y-4">
                    {company.founded && (
                      <p><strong>Founded:</strong> {company.founded}</p>
                    )}
                    {company.teamSize && (
                      <p><strong>Team Size:</strong> {company.teamSize}</p>
                    )}
                    {company.locations && (
                      <p><strong>Locations:</strong> {company.locations.join(" • ")}</p>
                    )}
                    {mission && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-foreground italic">"{mission}"</p>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}

          {/* Values */}
          {values && values.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Our Values</CardTitle>
                  <CardDescription>
                    <ul className="space-y-3 mt-2">
                      {values.map((value, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Experts */}
        {experts && experts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Meet Our Experts
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert, idx) => (
                <Card key={idx} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <CardDescription>
                      <p className="text-primary font-medium mb-2">{expert.title}</p>
                      {expert.credentials && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {expert.credentials.map((cred, cidx) => (
                            <Badge key={cidx} variant="secondary" className="text-xs">
                              {cred}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {expert.bio && (
                        <p className="text-sm text-muted-foreground mb-2">{expert.bio}</p>
                      )}
                      {expert.experience && (
                        <p className="text-sm text-muted-foreground italic">
                          {expert.experience}
                        </p>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Credentials */}
        {credentials && credentials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Certifications & Credentials</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {credentials.map((cred, idx) => (
                <Card key={idx} className="w-full sm:w-auto">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      {cred.verified && (
                        <span className="text-green-500">✓</span>
                      )}
                      {cred.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {cred.issuer} • {cred.year}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
