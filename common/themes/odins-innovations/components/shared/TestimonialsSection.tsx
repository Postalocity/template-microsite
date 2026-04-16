interface Testimonial {
  quote: string;
  author: string;
  location?: string;
  title?: string;
  image?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster.",
    author: "Justin Edwards",
    title: "Brings Feral Pigs In, Way More Frequently"
  },
  {
    quote: "Odin's is one of the more powerful scent systems I have used. The scent stays around for a long time (all season Sept-Jan and I can still smell it) and the cost is right. I shot a pretty good mature whitetail this year. As my heart sank, this buck turned last minute—I can only guess it was the Odin's I had been disbursing on the tree in front of me all hunt long.",
    author: "Grant Meyer",
    title: "Took a Risk!"
  },
  {
    quote: "Odin's innovations is awesome and I really got to watch it work today. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.",
    author: "Carl Fox",
    title: "Dropped This Big Sow!"
  },
  {
    quote: "I started putting out the apple scent the beginning of September... getting a lot of activity on the trail cams. Last week I was blessed to get a harvest... after the scent had been out over 30 days. Still brought her in!",
    author: "Brook",
    location: "Mississippi",
    title: "Getting a Lot of Activity"
  },
  {
    quote: "This is my son Peyton's first buck! Peyton & I have been placing small clusters of beads along our property line enhancing the natural acorn drops. Building a pattern early in the season along with using a scent that is similar to the natural food source has paid off!",
    author: "Peyton & His Dad",
    location: "Wisconsin",
    title: "First Buck and the Best Buck!"
  },
  {
    quote: "It was two and a half weeks after I put it out. It rained 4 days in a row and this was after the rain. I didn't refresh the scrape in 3 weeks. Thanks for making a great product!",
    author: "Jordan Edwards",
    location: "Central Kansas",
    title: "Loyal Customers Swear by the Results!"
  },
  {
    quote: "Odin's Innovations products kept these bucks around all season. I highly recommend it.",
    author: "Mike Ruddle, President",
    location: "Central Plains Outfitters, Central Kansas",
    title: "Make Them Come To You"
  },
  {
    quote: "Your product arrived and was exactly as described. I put it in a low traffic area and saw more deer than previous years. Overall, I was very pleased with the product, and I continue to recommend it to others.",
    author: "Nick Owens",
    location: "Missouri",
    title: "Recommend to Anyone"
  },
  {
    quote: "Product worked all season long! Even after heavy rain, the scent was still bringing deer in.",
    author: "Randy & Tony, Team Full Assignment",
    location: "Michigan",
    title: "Product Worked All Season Long"
  },
  {
    quote: "We have tried other products with limited success. But with Odin's, whenever we set it up, the deer showed up… even using the lure. I was also able to collect this fine buck!",
    author: "Chris",
    location: "Silverhill, Alabama",
    title: "Odin's Scents Made All The Difference"
  }
];

const TestimonialsSection = ({ testimonials = defaultTestimonials }: TestimonialsSectionProps) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="section-lg section-alt">
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(var(--accent))' }}
          >
            Field Reports
          </p>
          <h2 className="mb-6 text-foreground">
            Success Stories from the Field
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Real results from hunters who put Odin&apos;s to the test in the field. For hundreds more reviews, visit our product pages.
          </p>
        </div>

        {/* Testimonials - 2-column with accent borders */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="pl-6 pb-8"
              style={{ borderLeft: '3px solid hsl(var(--accent))' }}
            >
              {testimonial.title && (
                <p 
                  className="font-body text-sm font-bold uppercase-tracked mb-4"
                  style={{ color: 'hsl(var(--accent))' }}
                >
                  {testimonial.title}
                </p>
              )}
              
              <blockquote className="testimonial-quote mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              <div>
                <p className="font-body font-bold text-foreground">
                  {testimonial.author}
                </p>
                {testimonial.location && (
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Link to more testimonials */}
        <div className="mt-12">
          <a 
            href="https://www.odinsinnovations.com/pages/testimonials" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Read More Field Reports
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
