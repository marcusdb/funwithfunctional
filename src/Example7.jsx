import React from "react";
import { fromEvent } from "rxjs";
import { map, filter, combineLatest, tap, startWith } from "rxjs/operators";
import MarbleStream from "./MarbleStream";

const isNumeric = val => !isNaN(parseFloat(val)) && isFinite(val);

class Example7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream1: {},
      stream2: {},
      stream3: {},
      sum: 0
    };
    this.draw.bind(this);
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

  componentDidMount() {
    let first$ = fromEvent(
      document.getElementById("example7_input1"),
      "keyup"
    ).pipe(
      map(evt => evt.target.value),
      filter(val => isNumeric(val) || val.trim().length === 0),
      map(val => (isNumeric(val) ? parseFloat(val) : 0)),
      startWith(0),
      tap(value => this.draw(value, "stream1"))
    );

    let second$ = fromEvent(
      document.getElementById("example7_input2"),
      "keyup"
    ).pipe(
      map(evt => evt.target.value),
      filter(val => isNumeric(val) || val.trim().length === 0),
      map(val => (isNumeric(val) ? parseFloat(val) : 0)),
      startWith(0),
      tap(value => this.draw(value, "stream2"))
    );
    first$
      .pipe(
        combineLatest(second$, (s1, s2) => s1 + s2),
        tap(value => this.draw(value, "stream3"))
      )
      .subscribe(value => this.setState({ sum: value }));
  }

  render() {
    return (
      <div>
        <h4>Event Stream</h4>
        <input
          id="example7_input1"
          style={{
            width: "150px",
            height: "30px",
            fontSize: "24px"
          }}
        />
        &nbsp;+&nbsp;
        <input
          id="example7_input2"
          style={{
            width: "150px",
            height: "30px",
            fontSize: "24px"
          }}
        />
        &nbsp;=&nbsp;
        <input
          id="example7_input3"
          style={{
            width: "150px",
            height: "30px",
            fontSize: "24px"
          }}
          value={this.state.sum}
        />
        <pre>
          <code is className="javascript hljs" data-trim contenteditable>
            {`
              let first$ = fromEvent(document.getElementById("example7_input1"),"keyup").pipe(
                map(evt => evt.target.value),filter(val => isNumeric(val) || val.trim().length === 0),                
                map(val => (isNumeric(val) ? parseFloat(val) : 0)),startWith(0),tap(value => this.draw(value, "stream1"))
              );
              let second$ = fromEvent(document.getElementById("example7_input2"),"keyup").pipe(
                map(evt => evt.target.value),filter(val => isNumeric(val) || val.trim().length === 0),                
                map(val => (isNumeric(val) ? parseFloat(val) : 0)),startWith(0),tap(value => this.draw(value, "stream2"))
              );
              first$.pipe(
                  combineLatest(second$, (s1, s2) => s1 + s2),tap(value => this.draw(value, "stream3"))
              ).subscribe(value => this.setState({ sum: value }));
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
        <MarbleStream
          velocity={80}
          offset={50}
          distance={900}
          marble={this.state.stream3}
        />
      </div>
    );
  }
}

export default Example7;
