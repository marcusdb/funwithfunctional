import React from "react";
import { fromEvent } from "rxjs";
import { map, buffer, debounceTime, tap, filter } from "rxjs/operators";

import MarbleStream from "./MarbleStream";

class Example12 extends React.Component {
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
    this.setState({
      [name]: {
        value,
        id: parseInt(Math.random() * 10000)
      }
    });
  }

  componentDidMount() {
    let clicks$ = fromEvent(document.getElementById("example12_btn1"), "click");
    clicks$
      .pipe(
        buffer(clicks$.pipe(debounceTime(400))),
        map(list => list.length),
        tap(value => this.draw(value, "stream1")),
        filter(x => x ===3),
        tap(value => this.draw(value, "stream2"))
      )
      .subscribe();
  }

  render() {
    return (
      <div>
        <h3>Triple click challenge</h3>
        <div className="fragment">
          <button
            id="example12_btn1"
            style={{
              width: "120px",
              height: "30px",
              fontSize: "24px"
            }}
          >
            click me
          </button>

          <pre>
            <code is className="javascript hljs" data-trim contenteditable>
              {`
           let clicks$ = fromEvent(document.getElementById("example12_btn1"), "click");
           clicks$.pipe(
               buffer(clicks$.pipe(debounceTime(400))),
               map(list => list.length),
               tap(value => this.draw(value, "stream1")),
               filter(x => x===3),
               tap(value => this.draw(value, "stream2"))
            ).subscribe();
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
      </div>
    );
  }
}

export default Example12;
