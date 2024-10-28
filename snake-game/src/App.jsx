import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="border-4 border-gray-700 p-4 rounded-lg bg-gray-800 shadow-lg">
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
