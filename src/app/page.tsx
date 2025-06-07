"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Player from '@/Player';
import Enemy from '@/Enemy';
import Explosion from '@/Explosion';
import Background from '@/Background';
import Wall from '@/Wall';
import Bomb from '@/Bomb';
import HighScoreSidebar, { Score } from '@/HighScoreSidebar';
import { generateLevels, LevelConfig } from '@/levels';
import styles from './page.module.css';

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 70;
const PROJECTILE_WIDTH = 10;
const PROJECTILE_HEIGHT = 20;
const ENEMY_WIDTH = 60;
const ENEMY_HEIGHT = 40;
const WALL_WIDTH = 60;
const WALL_HEIGHT = 60;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const GRAVITY = 0.8;
const JUMP_STRENGTH = -15;
const MAX_HIGH_SCORES = 10;
const BOMB_DETONATION_Y = 100;

const allLevels = generateLevels();

interface Projectile {
  x: number;
  y: number;
  id: number;
  type: 'bullet' | 'bomb';
}

interface Enemy {
  x: number;
  y: number;
  id: number;
}

interface Explosion {
  x: number;
  y: number;
  id: number;
  life: number;
}

interface Structure {
  x: number;
  y: number;
  id: number;
  type: 'wall';
}

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [highScores, setHighScores] = useState<Score[]>([]);

  const [playerX, setPlayerX] = useState((GAME_WIDTH - PLAYER_WIDTH) / 2);
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - PLAYER_HEIGHT);
  const [playerVelocityY, setPlayerVelocityY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [structures, setStructures] = useState<Structure[]>([]);
  
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [wood, setWood] = useState(200);
  const [isBuilding, setIsBuilding] = useState(false);
  const [bombAvailable, setBombAvailable] = useState(true);

  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);

  // --- Audio Refs ---
  // To add sound, place your audio files (e.g., shoot.mp3, explosion.mp3)
  // in the /public folder of your project.
  const shootSoundRef = useRef<HTMLAudioElement | null>(null);
  const explosionSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    shootSoundRef.current = new Audio('/shoot.mp3');
    explosionSoundRef.current = new Audio('/explosion.mp3');

    try {
      const savedScores = localStorage.getItem('highScores');
      if (savedScores) {
        setHighScores(JSON.parse(savedScores));
      }
    } catch (error) {
      console.error("Could not load high scores from localStorage", error);
    }
  }, []);

  const playSound = (sound: 'shoot' | 'explosion') => {
    if (sound === 'shoot' && shootSoundRef.current) {
      shootSoundRef.current.currentTime = 0;
      shootSoundRef.current.play();
    } else if (sound === 'explosion' && explosionSoundRef.current) {
      explosionSoundRef.current.currentTime = 0;
      explosionSoundRef.current.play();
    }
  };

  const saveHighScore = useCallback((name: string, score: number) => {
    const newScore = { name, score };
    const newScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGH_SCORES);
    setHighScores(newScores);
    try {
      localStorage.setItem('highScores', JSON.stringify(newScores));
    } catch (error) {
      console.error("Could not save high scores to localStorage", error);
    }
  }, [highScores]);

  const setupLevel = useCallback((levelNum: number) => {
    const config = allLevels.find((l: LevelConfig) => l.level === levelNum);
    if (config) {
      const newEnemies = config.targets.map((t: { x: number, y: number }) => ({ ...t, id: Date.now() + Math.random() * 1000 }));
      setEnemies(newEnemies);
      setPlayerX((GAME_WIDTH - PLAYER_WIDTH) / 2);
      setPlayerY(GAME_HEIGHT - PLAYER_HEIGHT);
      setPlayerVelocityY(0);
      setIsJumping(false);
      setProjectiles([]);
      setExplosions([]);
      setStructures([]);
      setBombAvailable(true);
    }
  }, []);
  
  const startGame = useCallback(() => {
    if (!playerName) {
      alert("Please enter a player name.");
      return;
    }
    setShowNameInput(false);
    setLevel(1);
    setupLevel(1);
    setScore(0);
    setWood(200);
    setGameOver(false);
    setGameWon(false);
    setGameRunning(true);
  }, [setupLevel, playerName]);

  const goToNextLevel = useCallback(() => {
    const nextLevel = level + 1;
    if (nextLevel <= allLevels.length) {
      setLevel(nextLevel);
      setupLevel(nextLevel);
      setGameRunning(true);
    }
  }, [level, setupLevel]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'c') { // 'c' to toggle build mode
      e.preventDefault();
      setIsBuilding(prev => !prev);
    }
    
    if (e.key === 'b') { // 'b' to fire bomb
      e.preventDefault();
      if (bombAvailable && gameRunning) {
        setBombAvailable(false);
        setProjectiles((prev) => [
          ...prev,
          { x: playerX + PLAYER_WIDTH / 2 - PROJECTILE_WIDTH / 2, y: playerY, id: Date.now(), type: 'bomb' },
        ]);
        // Optional: play a bomb launch sound
      }
    }

    if (isBuilding) {
      if (e.key === 'v') { // 'v' to build a wall
        e.preventDefault();
        if (wood >= 10) {
          setStructures(prev => [...prev, {
            x: playerX + PLAYER_WIDTH / 2,
            y: playerY + PLAYER_HEIGHT - WALL_HEIGHT,
            id: Date.now(),
            type: 'wall'
          }]);
          setWood(w => w - 10);
        }
      }
      return;
    }
    
    if (!gameRunning) return;

    if (e.key === 'ArrowLeft') {
      setPlayerX((prevX) => Math.max(0, prevX - 20));
    } else if (e.key === 'ArrowRight') {
      setPlayerX((prevX) => Math.min(GAME_WIDTH - PLAYER_WIDTH, prevX + 20));
    } else if (e.key === ' ' || e.key === 'ArrowUp') { // Space bar or Arrow Up to jump
      e.preventDefault();
      if (!isJumping) {
        setPlayerVelocityY(JUMP_STRENGTH);
        setIsJumping(true);
      }
    } else if (e.key === 'x') { // 'x' key to shoot
      e.preventDefault();
      setProjectiles((prev) => [
        ...prev,
        { x: playerX + PLAYER_WIDTH / 2 - PROJECTILE_WIDTH / 2, y: playerY + PLAYER_HEIGHT / 2, id: Date.now(), type: 'bullet' },
      ]);
      playSound('shoot');
    }
  }, [gameRunning, playerX, isJumping, playerY, level, wood, isBuilding, bombAvailable]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
        const newPlayerVelocityY = playerVelocityY + GRAVITY;
        let newPlayerY = playerY + newPlayerVelocityY;
        let newIsJumping = isJumping;
        if (newPlayerY >= GAME_HEIGHT - PLAYER_HEIGHT) {
            newIsJumping = false;
            newPlayerY = GAME_HEIGHT - PLAYER_HEIGHT;
        }

        let newProjectiles = projectiles
            .map((p) => ({ ...p, y: p.y - (p.type === 'bomb' ? 5 : 15) }))
            .filter((p) => p.y > 0);

        const newEnemiesWithUpdatedY = enemies.map(t => {
          let blocked = false;
          for (const s of structures) {
            if (t.x < s.x + WALL_WIDTH && t.x + ENEMY_WIDTH > s.x && t.y + ENEMY_HEIGHT > s.y && t.y < s.y + WALL_HEIGHT) {
              blocked = true;
              break;
            }
          }
          const newY = blocked ? t.y : t.y + allLevels[level-1].targetSpeed;
          return { ...t, y: newY };
        });
        
        const projectilesToRemove = new Set<number>();
        let newScore = score;
        let newWood = wood;
        let shouldBeGameOver = false;

        const bombsToDetonate = newProjectiles.filter(p => p.type === 'bomb' && p.y <= BOMB_DETONATION_Y);
        newProjectiles = newProjectiles.filter(p => !(p.type === 'bomb' && p.y <= BOMB_DETONATION_Y));

        const newExplosions: Explosion[] = [];
        const enemiesToDestroy = new Set<number>();

        if (bombsToDetonate.length > 0) {
            playSound('explosion'); // A bigger explosion sound would be great here
            
            const enemiesWithDistances = newEnemiesWithUpdatedY.map(enemy => {
                const bomb = bombsToDetonate[0]; // Assuming one bomb at a time
                const dist = Math.sqrt(Math.pow(enemy.x - bomb.x, 2) + Math.pow(enemy.y - bomb.y, 2));
                return { ...enemy, dist };
            }).sort((a,b) => a.dist - b.dist);

            const closestEnemies = enemiesWithDistances.slice(0, 5);
            closestEnemies.forEach(enemy => {
                enemiesToDestroy.add(enemy.id);
                newScore += 10;
                newWood += 5; 
                newExplosions.push({ x: enemy.x, y: enemy.y, id: enemy.id, life: 90 });
            });
        }

        const enemiesAfterBomb = newEnemiesWithUpdatedY.filter(e => !enemiesToDestroy.has(e.id));
        const finalEnemiesAfterHits = [];

        for (const enemy of enemiesAfterBomb) {
            let enemyHit = false;
            for (const projectile of newProjectiles) {
                if (projectile.type === 'bullet' && !projectilesToRemove.has(projectile.id) &&
                    projectile.x < enemy.x + ENEMY_WIDTH &&
                    projectile.x + PROJECTILE_WIDTH > enemy.x &&
                    projectile.y < enemy.y + ENEMY_HEIGHT &&
                    projectile.y + PROJECTILE_HEIGHT > enemy.y
                ) {
                    projectilesToRemove.add(projectile.id);
                    enemyHit = true;
                    newScore += 10;
                    newWood += 5; 
                    newExplosions.push({ x: enemy.x, y: enemy.y, id: enemy.id, life: 90 });
                    playSound('explosion');
                }
            }
            if (!enemyHit) {
                finalEnemiesAfterHits.push(enemy);
            }
        }
        
        const finalEnemies = finalEnemiesAfterHits;
        newProjectiles = newProjectiles.filter(p => !projectilesToRemove.has(p.id));

        for (const enemy of finalEnemies) {
            if (
                playerX < enemy.x + ENEMY_WIDTH &&
                playerX + PLAYER_WIDTH > enemy.x &&
                newPlayerY < enemy.y + ENEMY_HEIGHT &&
                newPlayerY + PLAYER_HEIGHT > enemy.y
            ) {
                shouldBeGameOver = true;
            }
            if (enemy.y >= GAME_HEIGHT - ENEMY_HEIGHT) {
              shouldBeGameOver = true;
            }
        }
        
        const updatedExplosions = explosions
            .map(ex => ({ ...ex, life: ex.life - 1 }))
            .filter(ex => ex.life > 0);

        setPlayerVelocityY(newPlayerVelocityY);
        setPlayerY(newPlayerY);
        setIsJumping(newIsJumping);
        setProjectiles(newProjectiles);
        setEnemies(finalEnemies);
        setScore(newScore);
        setWood(newWood);
        setExplosions([...updatedExplosions, ...newExplosions]);

        if (shouldBeGameOver) {
            saveHighScore(playerName, newScore);
            setGameRunning(false);
            setGameOver(true);
        } else if (finalEnemies.length === 0 && enemies.length > 0) {
            if(level === allLevels.length) {
                saveHighScore(playerName, newScore);
                setGameWon(true);
            }
            setGameRunning(false);
        }

    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameRunning, playerX, playerY, playerVelocityY, isJumping, projectiles, enemies, score, level, wood, explosions, structures, playerName, highScores, saveHighScore]);

  const isLevelComplete = !gameRunning && enemies.length === 0 && !gameOver && !gameWon;

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startGame();
  }

  const handleChangePlayer = () => {
    setShowNameInput(true);
    setPlayerName('');
    setGameOver(false);
    setGameWon(false);
    setScore(0);
  };

  if (showNameInput) {
    return (
      <div className={styles.container}>
        <div className={styles.nameInputContainer}>
          <h1>Enter Your Name</h1>
          <form onSubmit={handleNameSubmit}>
            <input 
              type="text" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={15}
              className={styles.nameInput}
            />
            <button type="submit" className={styles.startButton}>Start Game</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <HighScoreSidebar scores={highScores} />
      <div className={styles.gameArea} style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
        <Background />
        {isBuilding && (
          <div className={styles.buildPreview} style={{ left: playerX + PLAYER_WIDTH / 2, top: playerY + PLAYER_HEIGHT - WALL_HEIGHT }}>
            <Wall />
          </div>
        )}
        {!gameRunning ? (
          <div className={styles.startScreen}>
            {gameOver && (
              <>
                <h1>Game Over</h1>
                <p>Final Score: {score}</p>
                <button onClick={startGame}>Play Again</button>
                <button onClick={handleChangePlayer} className={styles.secondaryButton}>Change Player</button>
              </>
            )}
            {gameWon && (
                <>
                    <h1>You Win!</h1>
                    <p>You conquered all {allLevels.length} levels!</p>
                    <p>Final Score: {score}</p>
                    <button onClick={startGame}>Play Again</button>
                    <button onClick={handleChangePlayer} className={styles.secondaryButton}>Change Player</button>
                </>
            )}
            {isLevelComplete && (
                <>
                    <h1>Level {level} Complete!</h1>
                    <p>Score: {score}</p>
                    <button onClick={goToNextLevel}>Next Level</button>
                </>
            )}
            {!gameOver && !gameWon && !isLevelComplete && !gameRunning && (
                <>
                    <h1>Realistic Shooter</h1>
                    <p>Welcome, {playerName}!</p>
                    <button onClick={startGame}>Start Game</button>
                </>
            )}
          </div>
        ) : (
          <>
            <div className={styles.gameInfo}>
              <div className={styles.score}>Score: {score}</div>
              <div className={styles.resources}>Wood: {wood}</div>
              <div className={styles.level}>Level: {level}</div>
              {bombAvailable && <div className={styles.bombIndicator}>Bomb Ready [B]</div>}
            </div>
            <div className={styles.player} style={{ left: playerX, top: playerY }}><Player /></div>
            {projectiles.map((p) => (
              p.type === 'bullet' 
                ? <div key={p.id} className={styles.projectile} style={{ left: p.x, top: p.y }}></div>
                : <div key={p.id} style={{ position: 'absolute', left: p.x, top: p.y }}><Bomb /></div>
            ))}
            {enemies.map((t) => (
              <div key={t.id} style={{ position: 'absolute', left: t.x, top: t.y }}><Enemy /></div>
            ))}
            {structures.map((s) => (
              <div key={s.id} style={{ position: 'absolute', left: s.x, top: s.y }}><Wall /></div>
            ))}
            {explosions.map((ex) => (
              <div key={ex.id} className={styles.explosion} style={{ left: ex.x, top: ex.y }}>
                <Explosion />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
