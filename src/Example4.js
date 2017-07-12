import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

class Example4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream1: {},
      stream2: {}
    }
    this.draw.bind(this)

  }

  draw(value, name) {
    this.setState((prevState) => {
      return {
        [name]: {
          value,
          id: parseInt(Math.random() * 10000)
        }
      };
    })

  }

  componentDidMount() {
    let plus$ = Rx.Observable.fromEvent(document.getElementById('example4_btn1'), 'click')
    plus$.map(() => 1).do((value) => this.draw(value, 'stream1')).subscribe()


    let minus$ = Rx.Observable.fromEvent(document.getElementById('example4_btn2'), 'click')
    minus$.map(() => -1).do((value) => this.draw(value, 'stream2')).subscribe()
      }

      render() {
        return (
          <div>
            <h3>stream de eventos</h3>
            <button id='example4_btn1' style={{
              width: '60px',
              height: '30px',
              fontSize: '24px'
            }}>+1</button>
            <button id='example4_btn2' style={{
              width: '60px',
              height: '30px',
              fontSize: '24px'
            }}>-1</button>
            <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
            let plus$ = Rx.Observable.fromEvent(element, 'click')
            plus$.map(() => 1).subscribe()


            let minus$ = Rx.Observable.fromEvent(element, 'click')
            minus$.map(() => -1).subscribe()
`}
        </code></pre>
            <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream1}/>
            <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream2}/>
          </div>
        )
      }
    }

    export default Example4
