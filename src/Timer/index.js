import React, { useState, useEffect } from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

class Timer {
  secondsPassed = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export const myTimer = new Timer();

const TimerView = observer(() => {
  const [timer, setTimer] = useState(() => new Timer());
  useEffect(() => {
    const handle = setInterval(() => {
      timer.increaseTimer();
    }, 1000);
    return () => {
      clearInterval(handle);
    }
  }, [timer]);

  return <span>Seconds Passed: { timer.secondsPassed }</span>
})

export default TimerView;