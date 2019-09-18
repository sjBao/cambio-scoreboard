import React, { Component } from 'react';
import './ScoreBoardMenu.css';

class ScoreBoardMenu extends Component {
  state = {
    input: ''
  }

  handleInputChange = e => {
    this.setState( { input: e.target.value } )
  }

  handleSubmit = e => {
    e.preventDefault()
    const newPlayer = {
      id: Math.random(),
      name: this.state.input,
      rounds: [],
      total: 0,
      img_url: 'https://shreckhiseshrubbery.com/wp-content/uploads/2018/01/placeholder-pic.png'
    }
    this.props.addPlayer(newPlayer);
  }
  render() {
    return (
      <div className="score-board-menu">
        <form onSubmit={this.handleSubmit} className="new-player-form">
          <input
            onChange={this.handleInputChange}
            value={this.state.input}
            name="newPlayer" 
            type="text" 
            placeholder="player name" />
          <button className="btn" type="submit">Add Player</button>
        </form>
      </div>
    )
  }
}

export default ScoreBoardMenu;