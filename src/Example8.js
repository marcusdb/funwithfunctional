import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

const isNumeric = (val) => (!isNaN(parseFloat(val)) && isFinite(val))

class Example8 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream1: {},
      stream2: {},
      stream3: {}
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
    const element = document.getElementById('dragTarget')
    //let mouseup$ = Rx.Observable.fromEvent(element, 'mouseup').do((value) => this.draw(value, 'stream1')).subscribe()
    let mousemove$ = Rx.Observable.fromEvent(element, 'mousemove').do((value) => this.draw(value, 'stream2')).subscribe()
    // let mousedown$ = Rx.Observable.fromEvent(element, 'mousedown').do((value) => this.draw(value, 'stream3')).map(event => {
    //   event.preventDefault();
    //   return {
    //     left: event.clientX - element.offset().left,
    //     top: event.clientY - element.offset().top
    //   };
    // }).do((value) => this.draw(value, 'stream3'))
    //
    // let mousedrag$ = mousedown$.mergeMap((offsetData) => mousemove$.map((position) => ({
    //   left: position.clientX - offsetData.left,
    //   top: position.clientY - offsetData.top
    // })).takeUntil(mouseup$))

    //mousedrag$.subscribe((resultPosition) =>(element.style={...element.style,top: pos.top, left: pos.left})); 				// Update position
    //mousedrag$.subscribe(console.log); 				// Update position

  }

  render() {
    return (
      <div>
        <h6>stream de eventos</h6>
        <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
            let plus$ = Rx.Observable.fromEvent(element, 'keyup')
            .map((evt) => evt.target.value).filter(val=>isNumeric(val))
            .map(val=>parseFloat(val)).startWith(0)


            let minus$ = Rx.Observable.fromEvent(element, 'keyup')
            .map((evt) => evt.target.value).filter(val=>isNumeric(val))
            .map(val=>parseFloat(val)).startWith(0)


            minus$.combineLatest(plus$,(s1,s2)=>s1+s2).subscribe(updateResultValue);
`}
        </code></pre>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream1}/>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream2}/>
        <MarbleStream velocity={80} offset={50} distance={900} marble={this.state.stream3}/>
        <div id='dragTarget' style={{backgroundColor:'red'}}>DRAG HERE</div>

      </div>
    )
  }
}

export default Example8
