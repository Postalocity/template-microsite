import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ChevronDown } from 'lucide-react';
import { ReviewsContent } from '../../types/content';

interface ReviewsSectionProps {
  reviews: ReviewsContent;
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  const toggleExpand = (idx: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(idx)) {
      newExpanded.delete(idx);
    } else {
      newExpanded.add(idx);
    }
    setExpandedReviews(newExpanded);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-5 h-5 ${
          idx < rating ? 'fill-primary text-primary' : 'text-border'
        }`}
      />
    ));
  };

  return (
    <section
      id="reviews"
      ref={ref}
      className="py-24 bg-background/50 border-t border-border"
      aria-labelledby="reviews-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="reviews-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {reviews.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {reviews.section.description}
          </p>
        </motion.div>

        {/* Aggregate Rating */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card/50 border-2 border-border rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {reviews.aggregateRating.overall}
              </div>
              <div className="flex gap-1 mb-2">
                {renderStars(Math.round(reviews.aggregateRating.overall))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviews.aggregateRating.total} reviews
              </p>
            </div>

            <div className="hidden sm:block">
              {reviews.aggregateRating.distribution.map((count, idx) => {
                const maxDistribution = Math.max(...reviews.aggregateRating.distribution);
                const percentage = (count / reviews.aggregateRating.total) * 100;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-4">
                      {5 - idx}
                    </span>
                    <div className="w-48 h-3 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Individual Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-card/50 border-2 border-border rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3">
                  {renderStars(review.rating)}
                  {review.verified && (
                    <CheckCircle2
                      className="w-5 h-5 text-primary flex-shrink-0"
                      aria-label="Verified review"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={expandedReviews.has(idx) ? 'expanded' : 'collapsed'}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-foreground leading-relaxed">
                    {expandedReviews.has(idx) ? review.text : review.text.slice(0, 150)}
                  </p>
                </motion.div>
              </AnimatePresence>

              {review.text.length > 150 && (
                <button
                  onClick={() => toggleExpand(idx)}
                  className="text-primary text-sm mt-2 hover:text-primary/80 flex items-center gap-1"
                  aria-expanded={expandedReviews.has(idx)}
                >
                  {expandedReviews.has(idx) ? (
                    <span>Show less</span>
                  ) : (
                    <span>Show more</span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedReviews.has(idx) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}

              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.role}, {review.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap gap-4 justify-center">
            {reviews.reviews.filter(r => r.verified).length > 0 && (
              <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4">
                <p className="text-primary font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  {reviews.reviews.filter(r => r.verified).length} Verified Reviews
                </p>
              </div>
            )}
            <div className="bg-card/50 border border-border rounded-2xl px-6 py-4">
              <p className="text-muted-foreground flex items-center gap-2">
                <Star className="w-5 h-5 fill-primary text-primary" />
                {reviews.aggregateRating.total} Total Reviews
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;