import React, { Component } from 'react'
import cambioLogo from '../cambioLogo.svg'
import { Link } from 'react-router-dom';

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
      <header>
        <img id="logo" src={cambioLogo} alt="cambio" />
      </header>
      <Link className="new-game-btn" to="/scoreboard">New Game</Link>
      <section className="rules">
        {
          rules.map( ({card, desc}) => 
            <div className="rule-card">
              <p className="card-value">{card}</p>
              <p className="power-description">
                {desc.map(txt => <span>{txt}</span>)}
              </p>
            </div>
          )
        }
      </section>
    </article>
  )
}

export default Splash