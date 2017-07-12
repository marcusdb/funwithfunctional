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
      return velocity(this.props.velocity).distinct().takeWhile(distance => distance < (this.props.distance-this.props.offset)).do({
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
  componentWillUnmount(){
    this.subscription.unsubscribe()
  }
  componentWillReceiveProps(nextProps) {
    nextProps.newMarbles && nextProps.newMarbles.map((value) => this.addMarble({
      id: parseInt(Math.random() * 10000),
      value
    }))
  }
  render() {    
    return <svg style={{
      width: '100%'
    }}> <line x1={this.props.offset} y1="50" x2={this.props.distance} y2="50" style={{
          stroke: '#fff',
          strokeWidth: 1
        }} id="mainLine"/>
    {Object.keys(this.state.marbles).map(marbleId => <Marble offset={50} key={marbleId} value={this.state.marbles[marbleId].value} translate={this.state.marbles[marbleId].translate}/>)}
    </svg>
  }
}

export default MarbleLiner
