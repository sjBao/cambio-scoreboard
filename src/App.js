import React from 'react';
import PlayerList from './PlayerList'
import ScoreBoardMenu from './ScoreBoardMenu'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: []
    }
  }

  addRoundToPlayer = (id, score) => {
    const newPlayers = this.state.players.map(player => {
      if (player.id === id) {
        const playerCopy = { ...player };
        playerCopy.rounds.unshift(score || 0);
        playerCopy.total = playerCopy.rounds.reduce((num, acc) => parseInt(num) + parseInt(acc));

        return playerCopy;
      } else {
        return player
      }
    })
    this.setState({ players: newPlayers })
  }

  addPlayer = newPlayerObj => {
    this.setState({
      players: [ ...this.state.players, newPlayerObj ]
    })
  }

  render() {
    return (
      <div className="App">
        <PlayerList 
          players={this.state.players} 
          addRoundToPlayer={this.addRoundToPlayer}
        />
        <ScoreBoardMenu addPlayer={this.addPlayer} />
      </div>
    );
  }
}

export default App;
