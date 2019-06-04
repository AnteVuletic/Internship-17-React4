import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlayerForm from './components/player/playerForm';
import Game from './components/game/game';
import ResourceCost from './components/resourceCost/resourceCost';
import PlayerWon from './components/playerWon/playerWon';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <PlayerForm {...props}/>} />
            <Route path="/Game" render={(props) => <Game {...props}/>} />
            <Route path="/Won" render={(props) => <PlayerWon {...props}/>}/>
          </Switch>
          <ResourceCost></ResourceCost>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
