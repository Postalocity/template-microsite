import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Trophy } from 'lucide-react';

interface TableComparisonProps {
  comparison: {
    headline: string;
    table: string[][];
    summary?: string;
  };
}

const ComparisonTable = ({ comparison }: TableComparisonProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!comparison?.table || comparison.table.length < 2) {
    return null;
  }

  const [headerRow, ...dataRows] = comparison.table;
  const odinsColumn = headerRow.length - 1; // Last column is Odin's

  // Check if cell indicates a positive/negative value
  const renderCell = (cell: string, cellIndex: number, rowIndex: number) => {
    const lowerCell = cell.toLowerCase().trim();
    
    // Checkmarks for positive indicators
    if (lowerCell === '✓' || lowerCell === 'yes' || lowerCell === 'true' || lowerCell === 'check') {
      return (
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 flex items-center justify-center"
            style={{ background: 'hsl(var(--primary))' }}
          >
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline font-body text-sm">Yes</span>
        </div>
      );
    }
    
    // X marks for negative indicators
    if (lowerCell === '✗' || lowerCell === 'no' || lowerCell === 'false' || lowerCell === 'x') {
      return (
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 flex items-center justify-center"
            style={{ background: 'hsl(var(--muted))' }}
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="hidden sm:inline font-body text-sm text-muted-foreground">No</span>
        </div>
      );
    }

    // Numeric values or text
    return <span className="font-body">{cell}</span>;
  };

  return (
    <section
      id="comparison"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Side By Side
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {comparison.headline}
            </h2>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {headerRow.map((cell, index) => (
                    <th
                      key={index}
                      className="py-4 px-4 md:px-6 text-left font-display uppercase text-sm"
                      style={{
                        background: index === odinsColumn ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                        color: index === odinsColumn ? 'white' : 'hsl(var(--foreground))',
                        width: index === 0 ? '40%' : '30%',
                        borderBottom: '3px solid hsl(var(--accent))'
                      }}
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: rowIndex * 0.08 }}
                    style={{
                      background: rowIndex % 2 === 0 ? 'white' : 'hsl(var(--muted) / 0.5)'
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-4 px-4 md:px-6"
                        style={{
                          borderLeft: cellIndex === odinsColumn ? '4px solid hsl(var(--primary))' : 'none',
                          background: cellIndex === odinsColumn ? 'hsl(var(--primary) / 0.05)' : 'transparent'
                        }}
                      >
                        {cellIndex === 0 ? (
                          <span 
                            className="font-body font-semibold"
                            style={{ color: 'hsl(var(--foreground))' }}
                          >
                            {cell}
                          </span>
                        ) : (
                          renderCell(cell, cellIndex, rowIndex)
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Odin's Wins Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 p-6"
            style={{ 
              background: 'hsl(var(--primary))',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 pr-8">
              <div 
                className="p-3"
                style={{ 
                  background: 'hsl(var(--accent))',
                  clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
                }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-center md:text-left">
                <div className="font-display text-lg font-bold uppercase mb-1">
                  {comparison.summary || "Odin's Innovations Wins On:"}
                </div>
                <div className="font-body text-sm opacity-90">
                  Longest-lasting scent release • Lab-tested effectiveness • All-weather performance • CWD-safe formula
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
