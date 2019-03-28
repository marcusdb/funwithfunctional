import React from "react";
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import MarbleStream from "./MarbleStream";

class Example4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream1: {},
      stream2: {}
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
    fromEvent(document.getElementById("example4_btn1"), "click")
      .pipe(map(() => 1))
      .subscribe(value => this.draw(value, "stream1"));
    fromEvent(document.getElementById("example4_btn2"), "click")
      .pipe(map(() => -1))
      .subscribe(value => this.draw(value, "stream2"));
  }

  render() {
    return (
      <div>
        <h3>Event Stream</h3>
        <button
          id="example4_btn1"
          style={{
            width: "60px",
            height: "30px",
            fontSize: "24px"
          }}
        >
          +1
        </button>
        <button
          id="example4_btn2"
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
fromEvent(document.getElementById("example4_btn1"), "click")
.pipe(map(() => 1))
.subscribe(value => this.draw(value, "stream1"));
fromEvent(document.getElementById("example4_btn2"), "click")
.pipe(map(() => -1))
.subscribe(value => this.draw(value, "stream2"));
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

export default Example4;
