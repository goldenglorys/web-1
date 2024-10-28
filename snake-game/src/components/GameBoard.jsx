import { useState, useEffect } from "react";

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
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
      };
      const newSnake = [newHead, ...snake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(getRandomPosition());
        setScore(score + 3);
      } else {
        newSnake.pop();
      }

      if (
        newHead.x < 0 ||
        newHead.x >= 20 ||
        newHead.y < 0 ||
        newHead.y >= 20
      ) {
        setIsGameOver(true);
        return;
      }

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
  }, [snake, direction, food, isGameOver, score]);

  const restartGame = () => {
    setSnake(initialSnake);
    setFood(getRandomPosition());
    setDirection({ x: 0, y: -1 });
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className="relative flex flex-col items-center w-[400px] h-[400px] bg-gray-900 rounded-lg">
      <div className="text-white text-xl mb-2">Score: {score}</div>

      <div className="relative w-full h-full bg-gray-800 grid grid-cols-20 grid-rows-20 border-2 border-gray-600 rounded-lg">
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

        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: "5%",
            height: "5%",
            left: `${food.x * 5}%`,
            top: `${food.y * 5}%`,
          }}
        ></div>

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
    </div>
  );
};

export default GameBoard;
