import React from "react";
import { fromEvent, Subject, of } from "rxjs";
import {
  map,
  debounceTime,
  switchMap,
  tap,
  delay,
  concatMap
} from "rxjs/operators";

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

class Example11 extends React.Component {
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

    fromEvent(document.getElementById("example11_input1"), "keyup")
      .pipe(
        map(evt => evt.target.value),
        debounceTime(400),
        tap(value => delayDrawStream1.next(value)),
        switchMap(val => remoteCall(val)),
        tap(value => delayDrawStream2.next(value))
      )
      .subscribe(value => this.updateResult(value));
  }

  render() {
    return (
      <div>
        <h3>Event Stream</h3>
        <input
          id="example11_input1"
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
             fromEvent(document.getElementById("example11_input1"), "keyup").pipe(
               map(evt => evt.target.value),
               debounceTime(400),
               tap(value => delayDrawStream1.next(value)),
               switchMap(val => remoteCall(val)),
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

export default Example11;
