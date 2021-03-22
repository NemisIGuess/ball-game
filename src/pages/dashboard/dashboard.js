import React, { useContext, useState } from "react";
import CommandsServiceContext from "../../services/commands-service.provider";
import GameViewport from "../../components/game-viewport/game-viewport";
import "./dashboard.scss";

export default function DashboardPage() {
  const commandsService = useContext(CommandsServiceContext);
  const [player, setPlayer] = useState({});
  const [players, setPlayers] = useState([]);

  return (
    <main className="dashboard-page">
      <div className="player">
        <p>Jugador: {player.id}</p>
        <button
          onClick={() => {
            commandsService.register((payload) => {
              setPlayer({ id: payload.id });
            });
            commandsService.onNewPlayers((payload) => {
              setPlayers(payload);
            });
          }}
        >
          Register
        </button>
      </div>
      <div className="player-list">
        {Object.keys(players).map((player) => {
          return <p key={player}>Player: {players[player].id}</p>;
        })}
      </div>
      <header className="nav">
        <h1>BALL GAMES</h1>
      </header>
      <GameViewport />
    </main>
  );
}
