export interface TargetConfig {
  x: number;
  y: number;
}

export interface LevelConfig {
  level: number;
  targetSpeed: number;
  targets: TargetConfig[];
}

const GAME_WIDTH = 800;
const MAX_LEVELS = 10;

export const generateLevels = (): LevelConfig[] => {
  const allLevels: LevelConfig[] = [];

  for (let i = 1; i <= MAX_LEVELS; i++) {
    const targets: TargetConfig[] = [];
    const numRows = Math.min(Math.floor(i / 2) + 1, 5);
    const targetsPerRow = Math.min(5 + i, 10);
    const rowSpacing = 60;
    const yOffset = 50;
    
    for (let row = 0; row < numRows; row++) {
      const colSpacing = (GAME_WIDTH - 100) / (targetsPerRow - 1);
      for (let col = 0; col < targetsPerRow; col++) {
          targets.push({
            x: 50 + col * colSpacing,
            y: yOffset + row * rowSpacing
          });
      }
    }
    
    // Cap total targets to avoid overwhelming the player
    const totalTargets = Math.min(i * 3, 30);
    
    allLevels.push({
      level: i,
      targetSpeed: 0.3 + i * 0.1,
      targets: targets.slice(0, totalTargets)
    });
  }
  
  return allLevels;
}; 