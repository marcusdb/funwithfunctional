import React from 'react';
import Rx from 'rxjs';
import Marble from './Marble'

const {Observable, Scheduler, Subject} = Rx
const msElapsed = (scheduler = Scheduler.animationFrame) => Observable.defer(() => {
  const start = scheduler.now();
  return Observable.interval(0, scheduler).map(() => scheduler.now() - start)
})
const velocity = (pixelsPerSeg, scheduler = Scheduler.animationFrame) => msElapsed(scheduler).map(elapsed => parseInt(elapsed * (pixelsPerSeg / 1000)))

const duration = (ms, scheduler = Scheduler.animationFrame) => msElapsed(scheduler).map(elapsed => elapsed / ms).takeWhile(t => t <= 1)
const distance = (d) => (t) => t * d
const animate = duration(2000).map(distance(200))

class MarbleLiner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      marbles: {}
    }
    this.addMarble.bind(this)
  }
  addMarble(marble) {
    this.setState((prevState) => {
      let newState = {
        ...prevState
      }
      newState.marbles[marble.id] = {
        ...marble,
        translate: 0
      }
      return newState;
    })
    this.subject.next(marble)
  }
  componentDidMount() {
    this.subject = new Subject();
    this.subscription = this.subject.mergeMap(marble => {
      return velocity(50).distinct().takeWhile(distance => distance < 200).do({
        next: distance => {
          this.setState((prevState) => {
            let newState = {
              ...prevState
            }
            newState.marbles[marble.id] = {
              ...marble,
              translate: distance
            }
            return newState;
          })
        },
        complete: () => {
          console.log('onComplete')
          this.setState((prevState) => {
            let newState = {
              ...prevState
            }
            delete newState.marbles[marble.id]
            return newState;
          })
        }
      })
    }).subscribe()
  }
  componentWillReceiveProps(nextProps) {
    nextProps.newMarbles && nextProps.newMarbles.map((value) => this.addMarble({
      id: parseInt(Math.random() * 10000),
      value
    }))
  }
  render() {
    return <svg style={{
      background: '#fff',
      width: '300px'
    }}> <line x1="0" y1="50" x2="200" y2="50" style={{
          stroke: '#00f',
          strokeWidth: 1
        }} id="mainLine"/>
    {Object.keys(this.state.marbles).map(marbleId => <Marble key={marbleId} value={this.state.marbles[marbleId].value} translate={this.state.marbles[marbleId].translate}/>)}
    </svg>
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.handleClick.bind(this)
  }
  handleClick() {    
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      };
    })
  }

  render() {
    return (<div>
      <button onClick={() => this.handleClick()}>bla</button>
      <MarbleLiner counter={this.state.counter} newMarbles={[this.state.counter]}/>
    </div>)
  }
}

export default Demo
