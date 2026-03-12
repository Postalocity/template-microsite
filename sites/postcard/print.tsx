/**
 * Postcard Print Page
 * 
 * This page shows the postcard for printing/exporting to PDF.
 * 
 * Print instructions:
 * 1. Open this page in browser
 * 2. Press Ctrl+P (or Cmd+P on Mac)
 * 3. Set destination to "Save as PDF"
 * 4. Set paper size to "Letter" or custom 6.25" x 4.25"
 * 5. Set margins to "None" 
 * 6. Enable "Background graphics"
 * 7. Disable headers and footers
 * 8. Save
 */

import React from 'react';
import { Postcard, PostcardFront, PostcardBack } from '../../common/components/postcard';

function PostcardPrintPage() {
  return (
    <div className="print-page">
      <div className="print-instructions">
        <h1>Postcard Print Page</h1>
        <div className="instructions">
          <h2>Print Instructions</h2>
          <ol>
            <li>Press <kbd>Ctrl</kbd>+<kbd>P</kbd> (or <kbd>Cmd</kbd>+<kbd>P</kbd> on Mac)</li>
            <li>Set destination to <strong>"Save as PDF"</strong></li>
            <li>Set paper size to <strong>"Letter"</strong> or <strong>6.25" x 4.25"</strong></li>
            <li>Set margins to <strong>"None"</strong></li>
            <li>Enable <strong>"Background graphics"</strong></li>
            <li>Disable <strong>headers and footers</strong></li>
            <li>Save as PDF</li>
          </ol>
        </div>
        <button onClick={() => window.print()} className="print-button">
          Print / Save as PDF
        </button>
      </div>

      <div className="postcard-wrapper">
        <PostcardFront />
        <PostcardBack />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f3f4f6;
          min-height: 100vh;
        }
        
        .print-page {
          padding: 0.5in;
        }
        
        .print-instructions {
          background: white;
          padding: 0.5in;
          border-radius: 0.5in;
          margin-bottom: 0.5in;
          text-align: center;
        }
        
        .print-instructions h1 {
          font-size: 24px;
          margin-bottom: 0.25in;
          color: #1a1a1a;
        }
        
        .instructions {
          background: #f9fafb;
          padding: 0.25in;
          border-radius: 0.25in;
          margin-bottom: 0.25in;
          text-align: left;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .instructions h2 {
          font-size: 14px;
          margin-bottom: 0.125in;
          color: #374151;
        }
        
        .instructions ol {
          padding-left: 0.25in;
          font-size: 12px;
          color: #4b5563;
          line-height: 1.8;
        }
        
        .instructions kbd {
          background: #e5e7eb;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 11px;
        }
        
        .print-button {
          background: #f59e0b;
          color: white;
          border: none;
          padding: 12px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .print-button:hover {
          background: #d97706;
        }
        
        .postcard-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5in;
        }
        
        @media print {
          .print-instructions {
            display: none !important;
          }
          
          body {
            background: white;
          }
          
          .print-page {
            padding: 0;
          }
          
          .postcard-wrapper {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}

export default PostcardPrintPage;
