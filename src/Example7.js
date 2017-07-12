import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

const isNumeric=(val)=>(!isNaN(parseFloat(val)) && isFinite(val))

class Example7 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream1: {},
      stream2: {},
      stream3: {},
      sum:0
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
    let first$ = Rx.Observable.fromEvent(document.getElementById('example7_input1'), 'keyup')
    .map((evt) => evt.target.value).filter(val=>isNumeric(val)||val.trim().length===0).map(val=>isNumeric(val)?parseFloat(val):0)
    .startWith(0).do((value) => this.draw(value, 'stream1'));

    let second$ = Rx.Observable.fromEvent(document.getElementById('example7_input2'), 'keyup')
    .map((evt) => evt.target.value).filter(val=>isNumeric(val)||val.trim().length===0).map(val=>isNumeric(val)?parseFloat(val):0)
    .startWith(0).do((value) => this.draw(value, 'stream2'));

    first$.combineLatest(second$,(s1,s2)=>s1+s2).do((value) => this.draw(value, 'stream3')).subscribe((value)=>this.setState({sum:value}));

  }

  render() {
    return (
      <div>
        <h3>stream de eventos</h3>
        <input id='example7_input1' style={{
          width: '150px',
          height: '30px',
          fontSize: '24px'
        }}/>
        &nbsp;+&nbsp;
        <input id='example7_input2' style={{
          width: '150px',
          height: '30px',
          fontSize: '24px'
        }}/>
        &nbsp;=&nbsp;
        <input id='example7_input3' style={{
          width: '150px',
          height: '30px',
          fontSize: '24px'
        }} value={this.state.sum}/>
        <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
            let first$ = Rx.Observable.fromEvent(element, 'keyup')
            .map((evt) => evt.target.value).filter(val=>isNumeric(val))
            .map(val=>parseFloat(val)).startWith(0)


            let second$ = Rx.Observable.fromEvent(element, 'keyup')
            .map((evt) => evt.target.value).filter(val=>isNumeric(val))
            .map(val=>parseFloat(val)).startWith(0)


            second$.combineLatest(plus$,(s1,s2)=>s1+s2).subscribe();
`}
        </code></pre>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream1}/>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream2}/>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream3}/>

      </div>
    )
  }
}

export default Example7
