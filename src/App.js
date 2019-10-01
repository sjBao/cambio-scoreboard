import React from 'react';
import Splash from './pages/Splash';
import PlayerList from './PlayerList';
import ScoreBoardMenu from './ScoreBoardMenu';
import { Switch, Route } from 'react-router-dom';
import "./App.css";



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
        playerCopy.total = playerCopy.rounds.reduce((acc, num) => {
          const total = parseInt(num) + (acc === 50 ? 0 : parseInt(acc));
          return total === 50 ? 0 : total
        }, 0);

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
      <Switch>
        <Route path='/scoreboard'
          component={
            () => (
              <div className="App">
                <PlayerList
                  players={this.state.players}
                  addRoundToPlayer={this.addRoundToPlayer}
                />
                <ScoreBoardMenu addPlayer={this.addPlayer} />
              </div>
            )
          }
        />
        <Route exact path='/' 
          component={Splash} />
      </Switch>
    );
  }
}

export default App;
