import React from 'react';
import {render} from 'react-dom'

const App = (props) => (
  <div className="slides">
    <section>Fun with Functional Reactive Programming</section>
    <section>
      <section>Vertical Slide 1</section>
      <section><img src="img/mind-blown.gif"/></section>
    </section>
  </div>
)

render(
  <App />,
  document.getElementById('slides')
)
