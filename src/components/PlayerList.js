import React, { Component } from 'react';
import Player from './Player';


class PlayerList extends Component {

  render() {
    return (
      <div className="player-list">
      {
        this.props.players.map(player => 
          <Player
            key={player.id}
            addRoundToPlayer={this.props.addRoundToPlayer} 
            player={player} 
          />
        )
      }
      </div>
    )
  }
}

export default PlayerList