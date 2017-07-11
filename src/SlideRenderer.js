import React from 'react'

class SlideRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    console.log('this.props.trigger:' + this.props.trigger)
    console.log(this.props)
    window.Reveal.addEventListener(this.props.trigger, () => {
      console.log('this.props.trigger ACTIVATED' + this.props.trigger)
      this.setState({active: true})
      window.Reveal.addEventListener('slidechanged', () => {
        window.Reveal.addEventListener('slidechanged', () => {
          console.log('this.props.trigger DEACTIVATED!!!!!!!' + this.props.trigger)
          this.setState({active: false})
        }, {once: true})
      },{once: true})
    })
  }
  render() {
    return <div>{this.state.active
        ? this.props.children
        : ''}</div>

  }

}

export default SlideRenderer
