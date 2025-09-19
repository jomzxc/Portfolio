import React, { useRef, useEffect } from 'react';

const CELL_SIZE = 20;
const UPDATE_INTERVAL = 120; // ms

type Point = { x: number; y: number };

const AnimatedGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useRef({
    cols: 0,
    rows: 0,
    offsetX: 0,
    offsetY: 0,
    snake: [{ x: 5, y: 5 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 }, // Moving right initially
  }).current;

  const resetSnake = () => {
    const startX = Math.floor(gameState.cols / 4);
    const startY = Math.floor(gameState.rows / 2);
    gameState.snake = [{ x: startX, y: startY }];
    gameState.direction = { x: 1, y: 0 };
    spawnFood();
  };

  const spawnFood = () => {
    gameState.food = {
      x: Math.floor(Math.random() * gameState.cols),
      y: Math.floor(Math.random() * gameState.rows),
    };
    // Ensure food doesn't spawn on the snake
    for (const segment of gameState.snake) {
      if (segment.x === gameState.food.x && segment.y === gameState.food.y) {
        spawnFood();
        break;
      }
    }
  };

  const update = () => {
    const WANDER_CHANCE = 0.2; // 20% chance to make a "wrong" turn
    const head = { ...gameState.snake[0] };
    const { x: dirX, y: dirY } = gameState.direction;

    // 1. Determine valid moves (no reversals)
    const validMoves: Point[] = [];
    if (dirX !== 0) { // Moving horizontally
      validMoves.push({ x: dirX, y: 0 }); // Continue forward
      validMoves.push({ x: 0, y: 1 });    // Turn down
      validMoves.push({ x: 0, y: -1 });   // Turn up
    } else { // Moving vertically
      validMoves.push({ x: 0, y: dirY }); // Continue forward
      validMoves.push({ x: 1, y: 0 });    // Turn right
      validMoves.push({ x: -1, y: 0 });   // Turn left
    }

    // 2. Decide whether to wander or move optimally
    if (Math.random() < WANDER_CHANCE) {
      // Wander: pick a random valid move
      const randomIndex = Math.floor(Math.random() * validMoves.length);
      gameState.direction = validMoves[randomIndex];
    } else {
      // Move optimally: score each valid move and pick the best one
      let bestMove = gameState.direction;
      let bestScore = -Infinity;

      const currentDist = Math.abs(gameState.food.x - head.x) + Math.abs(gameState.food.y - head.y);

      for (const move of validMoves) {
        const nextX = head.x + move.x;
        const nextY = head.y + move.y;
        const newDist = Math.abs(gameState.food.x - nextX) + Math.abs(gameState.food.y - nextY);
        const score = currentDist - newDist;

        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
      gameState.direction = bestMove;
    }


    head.x += gameState.direction.x;
    head.y += gameState.direction.y;
    
    // Wall collision (wrap around)
    if (head.x < 0) {
      head.x = gameState.cols - 1;
    } else if (head.x >= gameState.cols) {
      head.x = 0;
    }
    if (head.y < 0) {
      head.y = gameState.rows - 1;
    } else if (head.y >= gameState.rows) {
      head.y = 0;
    }

    // Check for self-collision
    for (let i = 1; i < gameState.snake.length; i++) {
        if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
            resetSnake();
            return;
        }
    }

    gameState.snake.unshift(head);

    // Check for food collision
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      spawnFood();
    } else {
      gameState.snake.pop();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastUpdateTime = 0;

    const getThemeColor = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const draw = (ctx: CanvasRenderingContext2D) => {
      const GRID_COLOR = getThemeColor('--grid-color');
      const SNAKE_COLOR = getThemeColor('--snake-color');
      const SNAKE_HEAD_COLOR = getThemeColor('--snake-head-color');
      const FOOD_COLOR = getThemeColor('--food-color');

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw grid
      for (let x = 0; x < gameState.cols; x++) {
        for (let y = 0; y < gameState.rows; y++) {
          ctx.strokeStyle = GRID_COLOR;
          ctx.strokeRect(gameState.offsetX + x * CELL_SIZE, gameState.offsetY + y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }

      // Draw snake
      gameState.snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
        ctx.fillRect(gameState.offsetX + segment.x * CELL_SIZE, gameState.offsetY + segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });

      // Draw food
      ctx.fillStyle = FOOD_COLOR;
      ctx.fillRect(gameState.offsetX + gameState.food.x * CELL_SIZE, gameState.offsetY + gameState.food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };


    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      gameState.cols = Math.floor(canvas.width / CELL_SIZE);
      gameState.rows = Math.floor(canvas.height / CELL_SIZE);
      
      gameState.offsetX = 0;
      gameState.offsetY = 0;

      resetSnake();
    };

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastUpdateTime > UPDATE_INTERVAL) {
        lastUpdateTime = timestamp;
        update();
        draw(ctx);
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    gameLoop(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full"
    />
  );
};

export default AnimatedGrid;