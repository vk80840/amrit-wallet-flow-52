
import { RankConfig } from '@/utils/rankSystem';

interface RankBadgeProps {
  rank: RankConfig;
  size?: 'sm' | 'md' | 'lg';
}

const RankBadge = ({ rank, size = 'md' }: RankBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const badgeSize = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div 
      className={`inline-flex items-center space-x-2 rounded-full font-bold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: rank.color }}
    >
      <span className={badgeSize[size]}>{rank.badge}</span>
      <span>{rank.name}</span>
    </div>
  );
};

export default RankBadge;
