import React from "react";
import { fromEvent, Subject, of } from "rxjs";
import { map, mergeMap, concatMap, tap, delay } from "rxjs/operators";

import MarbleStream from "./MarbleStream";

const matcher = val => {
  let target = "marcus";
  let regex = new RegExp("(" + val + ")");
  return target.match(regex) ? target.match(regex)[0] : "";
};

function randomDelay(bottom, top) {
  return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

const remoteCall = args =>
  Rx.Observable.of(matcher(args)).delay(randomDelay(10, 1000));

class Example9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream1: {},
      stream2: {},
      value: ""
    };
    this.draw.bind(this);
    this.updateResult.bind(this);
  }

  draw(value, name) {
    this.setState(prevState => {
      return {
        [name]: {
          value,
          id: parseInt(Math.random() * 10000)
        }
      };
    });
  }

  updateResult(result) {
    this.setState({ value: result });
  }

  componentDidMount() {
    //const delayDraw=(value,streamName)=>Rx.Observable.of(value).concatMap(evt => Rx.Observable.of(evt).do(x=>console.log('before:'+x)).delay(5000)).do(x=>console.log('after:'+x)).subscribe(value=>this.draw(value, streamName));
    //const delayDraw= new Rx.Subject().do(x=>console.log('before:'+x)).concatMap(evt => Rx.Observable.of(evt).do(x=>console.log('before:'+x)).delay(10000)).do(x=>console.log('after:'+x)).subscribe(value=>this.draw(value, 'stream1'));
    const delayDrawStream1 = new Subject()
      .pipe(
        concatMap(
          evt => of(evt),
          tap(x => console.log("before:" + x)),
          delay(500)
        )
      )
      .subscribe(value => this.draw(value, "stream1"));
    const delayDrawStream2 = new Subject()
      .pipe(
        concatMap(
          evt => of(evt),
          tap(x => console.log("before:" + x)),
          delay(500)
        )
      )
      .subscribe(value => this.draw(value, "stream2"));

    fromEvent(document.getElementById("example9_input1"), "keyup")
      .pipe(
        map(evt => evt.target.value),
        tap(value => delayDrawStream1.next(value)),
        mergeMap(val => remoteCall(val)),
        tap(value => delayDrawStream2.next(value))
      )
      .subscribe(value => this.updateResult(value));
  }

  render() {
    return (
      <div>
        <h5>Event Stream to the Server</h5>
        <input
          id="example9_input1"
          style={{
            width: "150px",
            height: "30px",
            fontSize: "24px"
          }}
        />
        &nbsp;Resultado&nbsp; --<span>{this.state.value}</span>--
        <pre>
          <code is className="javascript hljs" data-trim contenteditable>
            {`
     fromEvent(document.getElementById("example9_input1"), "keyup").pipe(
         map(evt => evt.target.value),
         tap(value => delayDrawStream1.next(value)),
         mergeMap(val => remoteCall(val)),
         tap(value => delayDrawStream2.next(value))
       ).subscribe(value => this.updateResult(value));
`}
          </code>
        </pre>
        <MarbleStream
          velocity={80}
          offset={50}
          distance={900}
          marble={this.state.stream1}
        />
        <MarbleStream
          velocity={80}
          offset={50}
          distance={900}
          marble={this.state.stream2}
        />
      </div>
    );
  }
}

export default Example9;
