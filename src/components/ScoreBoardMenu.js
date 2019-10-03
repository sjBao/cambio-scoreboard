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
    if (this.state.input) {
      const newPlayer = {
        id: Math.random(),
        name: this.state.input,
        rounds: [],
        total: 0
      }
      this.props.addPlayer(newPlayer); 
    } else {
      this.setState({ error: 'Name cannot be empty'})
    }
  }

  clearError = () => {
    this.state.error && this.setState({ error: false })
  }

  emoji = total => {
    if (total >= 40 && total < 50) {
      return "😳"
    }
    if (total > 30 && total < 40) {
      return "😐"
    }

    if (total < 0) {
      return "😏"
    }
  }

  handeDeleteClick = (name, id) => {
    if (window.confirm(`Are you sure you want to remove ${name} from game?`)) {
      this.props.removePlayer(id);
    }
  }

  render() {
    return (
      <aside onClick={this.clearError} className="score-board-menu">
        <form onSubmit={this.handleSubmit} className="new-player-form">
          {this.state.error && <p className="error">{this.state.error}</p>}
          <input
            onChange={this.handleInputChange}
            value={this.state.input}
            name="newPlayer" 
            type="text" 
            placeholder="add player" />
          <button className="btn" type="submit">+</button>
        </form>

        <ul className="player-tag-list">
          {
            this.props.players.map(({id, name, total}) => (
              <li className="player-tag" key={id}>
                <label htmlFor={`${name}-${id}`}>{this.emoji(total)} {name}</label>
                <button onClick={() => this.handeDeleteClick(name, id)}>x</button>
              </li>
            ))
          }
        </ul>
      </aside>
    )
  }
}

export default ScoreBoardMenu;