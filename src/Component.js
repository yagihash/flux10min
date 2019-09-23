import React from 'react'
import ActionCreator from './ActionCreator'
import Store from './Store'
import EventEmitter from './EventEmitter'

// EventEmitterのインスタンスをそれぞれ渡す
var dispatcher = new EventEmitter();
var action = new ActionCreator(dispatcher);
var store = new Store(dispatcher);

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: store.getCount()};
    // <---- Observe store's change
    store.on("CHANGE", () => {
      this._onChange();
    });
  }
  _onChange() {
    console.trace(); // onChangeまでのコールスタックを吐く
    this.setState({count: store.getCount()})
  }
  tick() {
    action.countUp(this.state.count + 1);
  }
  render() {
    return (
      <div>
        <button onClick={this.tick.bind(this)}>Count Up</button>
        <p>
          Count: {this.state.count}
        </p>
      </div>
    );
  }
}
