import React from 'react'
import { Link } from 'react-router-dom';
import Rules from '../components/Rules';
import CambioLogo from '../components/CambioLogo';

import './Splash.css'

const rules = [
  { 
    card: '7, 8',
    desc: ['Look at a card from your own hand.']
  },
  {
    card: '9, 10',
    desc: ['Look at a card from another\'s hand.']
  },
  {
    card: 'J, Q',
    desc: ['Blind swap a card from any hand with another card from any hand.']
  },
  {
    card: 'Black King',
    desc: ['Look at a card from another\'s hand.', 'You may choose to swap this with another card.']
  },
  {
    card: 'Red King',
    desc: ['Worth zero points.']
  },
  {
    card: 'Joker',
    desc: ['Worth negative one points.']
  }
]

const Splash = () => {
  return (
    <article>
      <CambioLogo />
      <Link className="new-game-btn" to="/scoreboard">New Game</Link>
      <Rules rules={rules} />
    </article>
  )
}

export default Splash