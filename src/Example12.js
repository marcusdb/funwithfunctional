import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

class Example12 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream1: {},
      stream2: {},
      stream3: {}
    }
    this.draw.bind(this)

  }

  draw(value, name) {
    this.setState({
        [name]: {
          value,
          id: parseInt(Math.random() * 10000)
        }
      })

  }

  componentDidMount() {
    let clicks$ = Rx.Observable.fromEvent(document.getElementById('example12_btn1'), 'click')

    clicks$
    .buffer(clicks$.debounceTime(400))
    .map((list) => list.length)
    .do((value) => this.draw(value, 'stream1'))
    .filter(x=>x>2)
    .do((value) => this.draw(value, 'stream2'))
    .subscribe();


  }

  render() {
    return (
      <div>
        <h3>Desafio do triple (ou maior) click</h3>
        <div className="fragment">
        <button id='example12_btn1' style={{
          width: '120px',
          height: '30px',
          fontSize: '24px'
        }}>click me</button>

        <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
            let clicks$ = Rx.Observable.fromEvent(document.getElementById('example12_btn1'), 'click')

            clicks$
            .buffer(clicks$.debounceTime(400))
            .map((list) => list.length)
            .filter(x=>x>2)
            .subscribe();
`}
        </code></pre>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream1}/>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream2}/>
        </div>
      </div>
    )
  }
}

export default Example12
