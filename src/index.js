import { autorun, makeAutoObservable, observable} from 'mobx';
import React from 'react';
import ReactDOM from "react-dom";
import { generateCandidates } from './scripts/candidates';
import { getLuckies } from './scripts/core';

import pixiApp from './PixiApp';

class Manager {
  step = 0;
  candidatesList = [];
  prizeNumber = 0;
  luckiesList = [];
  result = "";

  constructor() {
    makeAutoObservable(this);
  }
  handleGetCandidate() {
    this.candidatesList = generateCandidates(50);
    this.step = 2;
  }
  handleGetPrizeNum(e) {
    let n = parseInt(e.target.value);
    console.log(n);
    if (n > 0) {
      this.prizeNumber = n;
      this.step = 3;
    }
  }
  handleStarLottery() {
    this.step = 4;
    if (this.prizeNumber < this.candidatesList.length) {
      this.luckiesList = getLuckies(this.candidatesList, this.prizeNumber);
      this.step = 5;
    }
    else {
      alert("candidateNumber and prizeNumber is not Valid, please re input ");
      this.step = 1;
    }
  }
  handleShowResult() {
    this.step = 8;
    this.result = this.luckiesList.reduce((item1, item2) => {
      return item1 + ' ' + item2;
    })
    //console.log(this.result);
    this.render();
  }
  handleReset() {
    this.step = 7;
  }
  debug() {
    console.log(this.candidatesList);
    console.log(this.step);
    console.log(this.prizeNumber);
    console.log(this.luckiesList);
  }
  render() {
    ReactDOM.render(
      <div className="App">
        <button onClick={() => {
          this.step = 1;
        }}>Init</button>
        <button onClick={() => {
          this.debug();
        }}>debug</button>
        <button onClick={() => { this.handleGetCandidate() }}>Get Candidates</button>
        <input onChange={(e) => { this.handleGetPrizeNum(e) }}></input>
        <button onClick={() => { this.handleStarLottery() }}>Start Lottery</button>
        <button onClick={() => { this.handleShowResult() }}>Show Result</button>
        <button onClick={() => { this.handleReset()}}> Reset </button>
        <p className="result">{ this.result }</p>
      </div>, document.querySelector("#root"))
  }
  showResult() {
    console.log(this.luckiesList);
  }
}
let manager = new Manager();
manager.render();
autorun(() => { pixiApp.changeStage(manager.step) });
