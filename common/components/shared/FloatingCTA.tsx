import { ArrowRight } from 'lucide-react';

interface FloatingCTAProps {
  href: string;
  text?: string;
}

const FloatingCTA = ({ href, text = "Get Started" }: FloatingCTAProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a
        href={href}
        className="flex items-center gap-2 px-6 py-3 bg-[#B8860B] text-white font-semibold rounded-full shadow-lg hover:bg-[#9A7209] transition-colors animate-pulse"
      >
        {text}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

export default FloatingCTA;
