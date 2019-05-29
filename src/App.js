import React from 'react';
import Board from './components/board/board';
import { Provider } from 'react-redux';
import store from './redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Board></Board>
      </Provider>
    </div>
  );
}

export default App;
