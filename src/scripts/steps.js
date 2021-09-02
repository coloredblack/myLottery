import { makeAutoObservable } from "mobx";

class Step {
  step = 0;
  stepNames = ['init', 'CandidateDone', 'PrizeNumDone', 'StartUp', 'Finish']
  constructor() {
    makeAutoObservable(this);
  }
  next() {
    this.step += 1;
  }
  reset() {
    this.step = 0;
  }
}

export default Step;