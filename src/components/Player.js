import React, { Component } from 'react';
import './Player.css';

class Player extends Component {

  renderRounds() {
    const { rounds } = this.props.player;
    const roundComponents = [];
    for (let i = rounds.length -1; i >= 0; i--) {
      roundComponents.push(
        <div key={i} className="score-card">
          <p className="score">{rounds[i]}</p>
          <p className="player-total">Round {i + 1}</p>
        </div>
      )
      
    }
    return roundComponents;

  }

  handleSubmit = e => {
    e.preventDefault();

    const playerId = this.props.player.id;
    const score = e.target.score.value;

    this.props.addRoundToPlayer(playerId, score);
  }

  render() {
    const { name, total, id } = this.props.player;
    return (
      <div className="player-card">
        <label 
          htmlFor={`${name}-${id}`} 
          className="player-name">
          {name}
        </label>
        
        <div className="score-card total">
          <p style={{ fontSize: '24px' }} className="score">{total}</p>
          <p className="player-total">Total</p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="0"
            id={`${name}-${id}`} 
            name="score" 
            type="number" 
            max="51" 
            min="-2" />
          <button type="submit">Add Score</button>
        </form>

        <div className="rounds">
          {this.renderRounds()}
        </div>
      </div>
    )
  }
}

export default Player;