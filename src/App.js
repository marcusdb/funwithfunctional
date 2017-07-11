import React from 'react';
import {render} from 'react-dom'
import SlideRenderer from './SlideRenderer'
import Demo from './MarbleStream'



const App = (props) => (

  <div className="slides">

    <section>Fun with Functional Reactive Programming<Demo/></section>
    <section>
      <section>Vertical Slide 1</section>
      <section data-state="slideA"><SlideRenderer trigger="slideA"><img src="img/mind-blown.gif"/></SlideRenderer></section>
    </section>
  </div>
)

render(
  <App />,
  document.getElementById('slides')
)
