import type { ParentComponent } from "solid-js";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";



interface GameContextApi {
  addPlayer: (playerName: string) => void
  setGameName: (gameName: string) => void
  setGameStatus: (status: 'not-started' | 'in-progress' | 'finished') => void
}
interface GameContextState {
  gameName: string
  status: 'not-started' | 'in-progress' | 'finished'
	players: string[]
}
type GameContextModel = [ GameContextState, GameContextApi ]
const GameContext = createContext<GameContextModel>();

export const GameProvider: ParentComponent = (props) => {
  const [gameState, setGameState] = createStore<GameContextState>({
    gameName: "",
    status: "not-started",
    players: [],
  });

  const gameContextApi: GameContextModel = [
    gameState,
    {
      addPlayer(playerName: string) {
        setGameState("players", (p) => [...p, playerName]);
      },
      setGameName(gameName: string) {
        setGameState("gameName", gameName);
      },
      setGameStatus(status: 'not-started' | 'in-progress' | 'finished') {
        setGameState("status", status);
      }
    }
  ];


  return (
    <GameContext.Provider value={gameContextApi}>
      {props.children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }

  return context;
}
