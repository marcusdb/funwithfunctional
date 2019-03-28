import React from "react";
import { fromEvent } from "rxjs";
import { map, merge, tap, scan } from "rxjs/operators";
import MarbleStream from "./MarbleStream";

class Example6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream1: {},
      stream2: {},
      stream3: {}
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
    let plus$ = fromEvent(
      document.getElementById("example6_btn1"),
      "click"
    ).pipe(
      map(() => 1),
      tap(value => this.draw(value, "stream1"))
    );
    let minus$ = fromEvent(
      document.getElementById("example6_btn2"),
      "click"
    ).pipe(
      map(() => -1),
      tap(value => this.draw(value, "stream2"))
    );
    minus$
      .pipe(
        merge(plus$),
        scan((sum, val) => sum + val, 0)
      )
      .subscribe(value => this.draw(value, "stream3"));
  }

  render() {
    return (
      <div>
        <h3>Event Stream</h3>
        <button
          id="example6_btn1"
          style={{
            width: "60px",
            height: "30px",
            fontSize: "24px"
          }}
        >
          +1
        </button>
        <button
          id="example6_btn2"
          style={{
            width: "60px",
            height: "30px",
            fontSize: "24px"
          }}
        >
          -1
        </button>
        <pre>
          <code is className="javascript hljs" data-trim contenteditable>
            {`
    let plus$ = fromEvent(document.getElementById("example6_btn1"),"click").pipe(
      map(() => 1),
      tap(value => this.draw(value, "stream1"))
    );
    let minus$ = fromEvent(document.getElementById("example6_btn2"),"click").pipe(
      map(() => -1),
      tap(value => this.draw(value, "stream2"))
    );
    minus$.pipe(
        merge(plus$),
        scan((sum, val) => sum + val, 0)
      ).subscribe(value => this.draw(value, "stream3"));
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

export default Example6;
