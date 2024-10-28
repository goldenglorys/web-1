import { useState, useEffect } from "react";

// Helper function to generate random food position
const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 20),
  y: Math.floor(Math.random() * 20),
});

const GameBoard = () => {
  const initialSnake = [{ x: 10, y: 10 }];
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [isGameOver, setIsGameOver] = useState(false);

  // Handle direction change with arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Update snake position and check for collisions
  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };
      const newSnake = [newHead, ...snake];

      // Check for food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(getRandomPosition());
      } else {
        newSnake.pop(); // Remove last segment if no food collision
      }

      // Check for wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= 20 ||
        newHead.y < 0 ||
        newHead.y >= 20
      ) {
        setIsGameOver(true);
        return;
      }

      // Check for self-collision
      if (
        snake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setIsGameOver(true);
        return;
      }

      setSnake(newSnake);
    };

    const intervalId = setInterval(moveSnake, 100);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, isGameOver]);

  // Restart the game
  const restartGame = () => {
    setSnake(initialSnake);
    setFood(getRandomPosition());
    setDirection({ x: 0, y: -1 });
    setIsGameOver(false);
  };

  return (
    <div className="relative w-[90vmin] h-[90vmin] bg-gray-800 grid grid-cols-20 grid-rows-20">
      {/* Render Snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500"
          style={{
            width: "5%",
            height: "5%",
            left: `${segment.x * 5}%`,
            top: `${segment.y * 5}%`,
          }}
        ></div>
      ))}

      {/* Render Food */}
      <div
        className="absolute bg-red-500"
        style={{
          width: "5%",
          height: "5%",
          left: `${food.x * 5}%`,
          top: `${food.y * 5}%`,
        }}
      ></div>

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 text-white text-2xl">
          <p>Game Over</p>
          <button
            onClick={restartGame}
            className="mt-4 px-4 py-2 bg-blue-600 rounded"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
