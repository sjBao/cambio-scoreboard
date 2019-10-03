import React from 'react';
import Splash from './pages/Splash';
import Scoreboard from './pages/Scoreboard';
import { Switch, Route } from 'react-router-dom';
import "./App.css";



class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route path='/scoreboard'
          component={Scoreboard} />
        <Route path='/' 
          component={Splash} />
      </Switch>
    );
  }
}

export default App;
