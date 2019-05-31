import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PlayerForm from './components/player/playerForm';
import Game from './components/game/game'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <PlayerForm {...props}/>} />
            <Route path="/Game" render={(props) => <Game {...props}/>} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
