import React, { Component } from 'react';
import './Player.css';

class Player extends Component {

  renderRounds() {
    const { rounds } = this.props.player;
    return rounds.map((score, idx) => {
      return (
        <div key={idx} className="score-card">
          <p className="score">{score}</p>
          <p className="player-total">Round {rounds.length - idx}</p>
        </div>
      )
    })

  }

  handleSubmit = e => {
    e.preventDefault();

    const playerId = this.props.player.id;
    const score = e.target.score.value;

    this.props.addRoundToPlayer(playerId, score);
  }

  render() {
    const { name, total, img_url } = this.props.player;
    return (
      <div className="player-card">
        <div className="profile">
          <img src={img_url} alt="" />
          <p className="player-name">{name}</p>
        </div>
        
        <div className="score-card total">
          <p style={{ fontSize: '50px' }} className="score">{total}</p>
          <p className="player-total">Total</p>
        </div>

        <div className="rounds">
          {this.renderRounds()}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input name="score" type="number" placeholder="score" />
          <button type="submit">Add Score</button>
        </form>
      </div>
    )
  }
}

export default Player;