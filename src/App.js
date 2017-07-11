import React from 'react';
import {render} from 'react-dom'
import SlideRenderer from './SlideRenderer'
import Demo from './MarbleStream'



const App = (props) => (
  <div className="slides">
  <section data-background="img/zwift-screen-watopia-2.jpg">
<img src="img/zwift-primary-color.png" style={{width:'200px',backgroundColor:'white'}}/>
<h2 className="shadow">Tech Talk & Happy Hour</h2>
</section>
    <section><h2>Fun with Functional Reactive Programming</h2>
					<h4>Marcus David Bronstein @marcusdb</h4>
          </section>
    <section>
      <section>fun</section>
      <section><Demo/></section>
      <section data-state="slideA"><SlideRenderer trigger="slideA"><img src="img/mind-blown.gif"/></SlideRenderer></section>
    </section>
  </div>
)

render(
  <App />,
  document.getElementById('slides')
)
