import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TableComparisonProps {
  comparison: {
    headline: string;
    table: string[][];
  };
}

const ComparisonTable = ({ comparison }: TableComparisonProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!comparison?.table || comparison.table.length < 2) {
    return null;
  }

  const [headerRow, ...dataRows] = comparison.table;

  return (
    <section
      id="comparison"
      ref={ref}
      className="section-padding bg-background"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-2xl uppercase mb-10 text-center">
            {comparison.headline}
          </h2>

          <div className="overflow-x-auto">
            <table className="comparison-table w-full">
              <thead>
                <tr className="border-b-2 border-foreground">
                  {headerRow.map((cell, index) => (
                    <th
                      key={index}
                      className={`py-4 px-6 text-left font-display uppercase text-sm ${
                        index === 0 ? 'w-1/4' : 'w-3/8'
                      }`}
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
                    transition={{ duration: 0.4, delay: rowIndex * 0.1 }}
                    className="border-b border-border hover:bg-section-alt transition-colors"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`py-4 px-6 ${
                          cellIndex === 0
                            ? 'font-body font-semibold text-foreground'
                            : 'font-body text-muted-foreground'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
