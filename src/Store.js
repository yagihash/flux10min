import Emitter from './EventEmitter'

export default class Store extends Emitter {
  constructor(dispatcher) {
    super();
    this.count = 0;
    // <--- observe event.
    dispatcher.on('countUp', this.onCountUp.bind(this));
  }
  getCount() { // stateを取り出すメソッド
    return this.count;
  }
  onCountUp(count) {
    this.count = count;
    // emit "CHANGE" ---> self
    this.emit("CHANGE");
  }
}
