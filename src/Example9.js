import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

const matcher=(val)=>{
  let target = "marcus"
  let regex=new RegExp('('+val+')');
  return target.match(regex)?target.match(regex)[0]: '';
}

function randomDelay(bottom, top) {
  return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

const remoteCall=(args)=>(
  Rx.Observable
      .of(matcher(args))
      .delay(randomDelay(10,1000))
)

class Example9 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream1: {},
      stream2: {},
      value:''
    }
    this.draw.bind(this)
    this.updateResult.bind(this)

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

  updateResult(result){
    this.setState({value:result})
  }

  componentDidMount() {
    let input$ = Rx.Observable.fromEvent(document.getElementById('example9_input1'), 'keyup')
    .map((evt) => evt.target.value).do((value) => this.draw(value, 'stream1'));

    input$.mergeMap(val=>remoteCall(val)).do((value) => this.draw(value, 'stream2')).subscribe((value)=>this.updateResult(value))


  }

  render() {
    return (
      <div>
        <h3>stream de eventos</h3>
        <input id='example9_input1' style={{
          width: '150px',
          height: '30px',
          fontSize: '24px'
        }}/>
        &nbsp;Resultado&nbsp;
        --<span>{this.state.value}</span>--
        <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
            let input$ = Rx.Observable.fromEvent(document.getElementById('example9_input1'), 'keyup')
            .map((evt) => evt.target.value);
            input$.mergeMap(val=>remoteCall(val)).subscribe(updateResult)
`}
        </code></pre>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream1}/>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream2}/>

      </div>
    )
  }
}

export default Example9
