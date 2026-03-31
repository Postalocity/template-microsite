import { LucideIcon } from 'lucide-react';

interface RusticIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * RusticIcon - Wraps Lucide icons with hunting-appropriate styling
 * - Thicker strokes (3px) for hand-carved feel
 * - Rounded caps/joins for organic look
 * - Consistent sizing and visual weight
 */
const RusticIcon = ({ 
  icon: Icon, 
  size = 20, 
  color,
  className = '' 
}: RusticIconProps) => {
  return (
    <Icon
      size={size}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={color ? { color } : undefined}
    />
  );
};

export default RusticIcon;
