const {Observable, Scheduler} = Rx

const msElapsed=(scheduler= Scheduler.animationFrame)=>
Observable.defer(() => {
  const start= scheduler.now();
  return Observable.interval(0,scheduler).map(()=>scheduler.now()-start)
})

const duration=(ms,scheduler=Scheduler.animationFrame)=>msElapsed(scheduler).map(elapsed=>elapsed/ms).takeWhile(t=>t<=1)

const distance= (d)=>(t)=>t*d

const animate=duration(2000).map(distance(200))

const Marble=(props)=>(
<g >
    <circle style={{fill:"#000"}} cx={10+props.translate} cy="50" r="2">
    </circle>
    <text x={8+props.translate} y="45"  style={{fontFamily: 'Times New Roman',
             fontSize: '5px',
             fill: '#000'}}>{props.value}</text>

  </g>
)

//parseInt(Math.random()*10000)

class MarbleLiner extends React.Component {
  constructor(props){
    super(props)
    this.state={marbles:{1:{value:'1',translate:0}}}
    this.addMarble.bind(this)
  }
  addMarble({marbleId,value=0}){
     const observer = {
      next: (x) => {
        this.setState({marbles:{[marbleId]:{translate:x,value:value}}})
      },
complete: () =>{this.setState((prevState) => {
     delete prevState.marbles[marbleId]
     return prevState;
   })}
    };
    animate.subscribe(observer)
  }

  componentDidMount(){
    Object.keys(this.state.marbles).map((marbleId)=>this.addMarble({marbleId}))
  }

   componentWillReceiveProps(nextProps){
    nextProps.newMarbles && nextProps.newMarbles.map((value)=>this.addMarble({marbleId:parseInt(Math.random()*10000),value}))
  }

  render() {
    return   <svg viewBox="0 0 500 500">
        <line x1="0" y1="50" x2="200" y2="50" style={{stroke:'#00f',strokeWidth:1}} id="mainLine" />
      {Object.keys(this.state.marbles).map(marbleId=>
                                           <Marble key={marbleId} value={this.state.marbles[marbleId].value} translate={this.state.marbles[marbleId].translate} />
                                          )}

    </svg>;
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={counter:0}
    this.handleClick.bind(this)
  }
  handleClick(){
    console.log(this.state.counter)
   this.setState((prevState) => {
  return {counter: prevState.counter + 1};
})
  }

  render(){
    return <div>
            <button onClick={()=>this.handleClick()}>bla</button>
      {this.state.counter}
      <MarbleLiner counter={this.state.counter} newMarbles={[this.state.counter]}/>
      </div>
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
