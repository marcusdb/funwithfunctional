import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

class Example3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream1: 0
    }
    this.draw.bind(this)

  }

  draw(value,name) {
    this.setState((prevState) => {
      return {[name]:{value,id: parseInt(Math.random() * 10000)}};
    })

  }

  componentDidMount() {
    Rx.Observable.fromEvent(document.getElementById('example3_btn1'), 'click').map(() => 1).do
      ((value) => {
        this.draw(value,'stream1')
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
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream1}/>
      </div>
    )
  }
}

export default Example3
