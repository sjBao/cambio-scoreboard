import React from 'react';


const Rules = ({ rules }) => (
  <section className="rules">
    {
      rules.map(({ card, desc }) =>
        <div className="rule-card">
          <p className="card-value">{card}</p>
          <p className="power-description">
            {desc.map(txt => <span>{txt}</span>)}
          </p>
        </div>
      )
    }
  </section>
)

export default Rules;