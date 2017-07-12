import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

class Example3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }

  }

  componentDidMount() {
    Rx.Observable.fromEvent(document.getElementById('example3_btn1'), 'click').map(() => 1).do
      (() => {
        this.setState((prevState) => {
          return {counter: 1};
        })
      }).subscribe()
  }

  render() {
    return (
      <div>
        <h3>stream de eventos</h3>
        <button id='example3_btn1' style={{
          width: '60px',
          height: '30px',
          fontSize: '24px'
        }}>+1</button>
        <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
let eventStream =Rx.Observable.fromEvent($("example2_btn1"),'click');

eventStream.do(console.log).subscribe();`}
        </code></pre>
        <MarbleStream velocity={80} offset={50} distance={900} counter={this.state.counter} newMarbles={[this.state.counter]}/>
      </div>
    )
  }
}

export default Example3
