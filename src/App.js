import React, { useEffect, useState} from 'react';
//import Canvas from './Canvas';
import TimerView, { myTimer } from './Timer';


class App extends React.Component {
  render() {

    
    return (
      <div className="app">
        <TimerView timer={ myTimer}/>
      </div>
    )
  }
}

setInterval(() => {
  myTimer.increaseTimer();
}, 1000);

export default App;