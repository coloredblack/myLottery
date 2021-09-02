# 配置mobx

原本想要使用redux的，但是在跑它的hello world文件时候出现了很奇怪的bug，就是Provider中button的onClick属性失效了。查了半天不知道该怎么做，所以算了。换mobx

跑mobx的demo是一个定时器：

首先安装：

```
npm install mobx mobx-react
```
然后创建Timer/index.js
```js
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
```


然后修改App.js

```js
//src/App.js
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

```

浏览器成功弄出来一个计时器，但是有一个warning说我们使用未加载的状态可能导致内存泄漏，这个warning是因为我们使用了计时器，也就是用promise更新react状态导致的，也就是程序不能保证这个promise最后能否实现，所以可能会导致意外的情况，这是关于设计模式的bug，暂时忽略，具体参考这篇文章：

https://medium.com/@shanplourde/avoid-react-state-update-warnings-on-unmounted-components-bcecf054e953