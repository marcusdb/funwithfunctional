import React from 'react';
import Rx from 'rxjs';
import MarbleStream from './MarbleStream'

const isNumeric = (val) => (!isNaN(parseFloat(val)) && isFinite(val))

const getOffset = (el) => {
  return {left: el.offsetLeft, top: el.offsetTop}
  //return el.getBoundingClientRect();
}

class Example8 extends React.Component {


  render() {
    return (
      <div>
        Drag And Drop
        <pre><code is className="javascript hljs" data-trim contenteditable>
          {`
            let mouseup$ = Rx.Observable.fromEvent(element, 'mouseup')
            let mousemove$ = Rx.Observable.fromEvent(element, 'mousemove')
            let mousedown$ = Rx.Observable.fromEvent(element, 'mousedown').map(event => getOffset(event))
            let mousedrag$ = mousedown$.mergeMap((offsetData) =>
                mousemove$.map((position) => (calculateNewPositionWithOffset(offsetData,position)))
                .takeUntil(mouseup$)
            )
            mousedrag$.subscribe((resultPosition) => this.updatePosition(resultPosition));
`}
        </code></pre>
        <aside className="notes">
          code pen https://codepen.io/marcusdb/pen/GEwYZd plain https://codepen.io/marcusdb/pen/rwPOEJ
        </aside>

      </div>
    )
  }
}

export default Example8
