import React, { Component } from 'react';
import PlayerList from '../components/PlayerList';
import ScoreBoardMenu from '../components/ScoreBoardMenu';

import './Scoreboard.css'

class Scoreboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [
        {
          id: 0,
          name: 'Tony',
          rounds: [1, 2, 3],
          total: 6
        },
        {
          id: 1,
          name: 'Tony',
          rounds: [1, 2, 3],
          total: 6
        },
        {
          id: 2,
          name: 'Tony',
          rounds: [1, 2, 3],
          total: 6
        }
      ]
    }
  }

  addRoundToPlayer = (id, score) => {
    const newPlayers = this.state.players.map(player => {
      if (player.id === id) {
        const playerCopy = { ...player };
        playerCopy.rounds.push(score || 0);
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

  saveGame = state => localStorage.setItem('cambio', JSON.stringify(state))

  addPlayer = newPlayerObj => {
    this.setState({
      players: [...this.state.players, newPlayerObj]
    })
  }

  removePlayer = playerId => {
    this.setState(prevState => ({
      players: prevState.players.filter(player => player.id != playerId)
    }))
  }

  componentDidMount() {
    const previousGame = localStorage.getItem('cambio')
    if (previousGame) {
      this.setState(JSON.parse(previousGame))
    }
  }

  componentDidUpdate() {
    this.saveGame(this.state);
  }

  render() {
    return (
      <article className="Scoreboard">
        <ScoreBoardMenu
          players={this.state.players}
          removePlayer={this.removePlayer}
          addPlayer={this.addPlayer} />
        <PlayerList
          players={this.state.players}
          addRoundToPlayer={this.addRoundToPlayer}
        />
      </article>
    )
  }
}

export default Scoreboard;