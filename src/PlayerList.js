import React, { Component } from 'react';
import Player from './Player';

const styles = {
  display: 'flex',
  flexDirection: 'column',
}

class PlayerList extends Component {

  render() {
    return (
      <div style={styles} className="player-list">
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