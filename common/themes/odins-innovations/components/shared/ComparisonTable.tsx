import { ComparisonContent } from "@/types/content";
import { X, Check } from "lucide-react";

interface ComparisonTableProps {
  comparison: ComparisonContent;
}

const ComparisonTable = ({ comparison }: ComparisonTableProps) => {
  return (
    <section id="comparison" className="section-lg" style={{ background: 'hsl(220 15% 8%)' }}>
      <div className="section-container">
        {/* Section header - bold, aggressive */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(145 45% 55%)' }}
          >
            The Difference
          </p>
          <h2 className="mb-6" style={{ color: 'white' }}>
            {comparison.section.title}
          </h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: 'hsl(220 10% 60%)' }}>
            {comparison.section.description}
          </p>
        </div>

        {/* VS Header */}
        <div className="grid md:grid-cols-2 gap-0 mb-8">
          <div className="text-center py-4" style={{ background: 'hsl(220 10% 15%)' }}>
            <h3 className="font-body text-sm font-bold uppercase-tracked" style={{ color: 'hsl(220 8% 50%)' }}>
              {comparison.columns.traditional}
            </h3>
          </div>
          <div className="text-center py-4 relative" style={{ background: 'hsl(145 45% 38% / 0.15)' }}>
            <h3 className="font-body text-sm font-bold uppercase-tracked" style={{ color: 'hsl(145 45% 55%)' }}>
              {comparison.columns.ourSolution}
            </h3>
            {/* VS Badge */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center font-display text-lg"
              style={{ 
                background: 'hsl(220 15% 8%)',
                border: '2px solid hsl(220 10% 25%)',
                color: 'hsl(220 10% 60%)'
              }}
            >
              VS
            </div>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="border border-[hsl(220_10%_20%)]">
          {comparison.rows.map((row, i) => (
            <div 
              key={row.feature}
              className="grid md:grid-cols-2"
              style={{ 
                borderBottom: i < comparison.rows.length - 1 ? '1px solid hsl(220 10% 15%)' : 'none'
              }}
            >
              {/* Traditional - muted, with X */}
              <div className="p-6 lg:p-8 flex items-start gap-4" style={{ background: 'hsl(220 10% 12%)' }}>
                <div 
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
                  style={{ 
                    background: 'hsl(0 50% 45% / 0.15)',
                    color: 'hsl(0 50% 55%)'
                  }}
                >
                  <X size={16} strokeWidth={3} strokeLinecap="round" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold mb-1" style={{ color: 'hsl(220 10% 65%)' }}>
                    {row.feature}
                  </p>
                  <p className="font-body text-sm" style={{ color: 'hsl(220 8% 45%)' }}>
                    {row.traditionalApproach}
                  </p>
                </div>
              </div>

              {/* Odin's - highlighted, with check */}
              <div className="p-6 lg:p-8 flex items-start gap-4" style={{ background: 'hsl(145 45% 38% / 0.05)' }}>
                <div 
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
                  style={{ 
                    background: 'hsl(145 45% 38% / 0.2)',
                    color: 'hsl(145 45% 55%)'
                  }}
                >
                  <Check size={16} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold mb-1" style={{ color: 'white' }}>
                    {row.feature}
                  </p>
                  <p className="font-body text-sm" style={{ color: 'hsl(220 10% 70%)' }}>
                    {row.ourSolution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA - aggressive, hunter-focused */}
        <div className="mt-12 text-center">
          <p className="font-body text-lg mb-6" style={{ color: 'hsl(220 10% 60%)' }}>
            Stop settling for lures that wash away in the rain.
          </p>
          <a 
            href="https://www.odinsinnovations.com/collections/scent-beads"
            className="btn-accent text-base px-10 py-4 inline-block"
            style={{ 
              boxShadow: '0 8px 24px hsl(145 45% 38% / 0.3)',
              letterSpacing: '0.08em'
            }}
          >
            Shop Synthetic Beads — $17.95
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
