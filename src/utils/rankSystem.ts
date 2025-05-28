
export interface RankConfig {
  name: string;
  level: number;
  requiredSalaryLevel: number;
  color: string;
  badge: string;
}

export const RANKS: RankConfig[] = [
  { name: 'Wood', level: 1, requiredSalaryLevel: 1, color: '#8B4513', badge: '🪵' },
  { name: 'Bronze', level: 2, requiredSalaryLevel: 2, color: '#CD7F32', badge: '🥉' },
  { name: 'Silver', level: 3, requiredSalaryLevel: 3, color: '#C0C0C0', badge: '🥈' },
  { name: 'Gold', level: 4, requiredSalaryLevel: 4, color: '#FFD700', badge: '🥇' },
  { name: 'Ruby', level: 5, requiredSalaryLevel: 5, color: '#E0115F', badge: '💎' },
  { name: 'Sapphire', level: 6, requiredSalaryLevel: 6, color: '#0F52BA', badge: '💍' },
  { name: 'Emerald', level: 7, requiredSalaryLevel: 7, color: '#50C878', badge: '🔮' },
  { name: 'Platinum', level: 8, requiredSalaryLevel: 8, color: '#E5E4E2', badge: '⭐' },
  { name: 'Diamond', level: 9, requiredSalaryLevel: 9, color: '#B9F2FF', badge: '💠' },
  { name: 'Mythic', level: 10, requiredSalaryLevel: 10, color: '#9966CC', badge: '🌟' },
  { name: 'Celestial', level: 11, requiredSalaryLevel: 11, color: '#4169E1', badge: '✨' }
];

export function getUserRank(salaryLevel: number): RankConfig {
  // Find the highest rank the user qualifies for based on completed salary levels
  const qualifiedRanks = RANKS.filter(rank => salaryLevel >= rank.requiredSalaryLevel);
  return qualifiedRanks.length > 0 ? qualifiedRanks[qualifiedRanks.length - 1] : RANKS[0];
}

export function getNextRank(currentSalaryLevel: number): RankConfig | null {
  const nextRank = RANKS.find(rank => rank.requiredSalaryLevel > currentSalaryLevel);
  return nextRank || null;
}
