import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ReviewsContent } from "../../types/content";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Star, Verified } from "lucide-react";

interface ReviewsSectionProps {
  reviews: ReviewsContent;
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!reviews?.section) {
    return null;
  }

  const { reviews: reviewList, aggregateRating } = reviews;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {reviews.section.title}
          </h2>
          {reviews.section.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {reviews.section.description}
            </p>
          )}
        </motion.div>

        {/* Aggregate Rating */}
        {aggregateRating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-4 bg-muted/50 rounded-lg px-6 py-4">
              <div className="text-4xl font-bold text-foreground">
                {aggregateRating.overall}
              </div>
              <div className="text-left">
                <div className="flex mb-1">
                  {renderStars(Math.round(aggregateRating.overall))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {aggregateRating.total.toLocaleString()} reviews
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Individual Reviews */}
        {reviewList && reviewList.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewList.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <div className="flex items-center gap-1 text-green-600 text-xs">
                          <Verified className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-foreground mb-4">
                      "{review.text}"
                    </CardDescription>
                    <div className="pt-4 border-t">
                      <p className="font-medium text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.role}
                        {review.location && ` • ${review.location}`}
                      </p>
                      {review.date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
