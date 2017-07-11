import React from 'react'

class SlideRenderer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    window.Reveal.addEventListener(this.props.trigger, () => {
      this.setState({active: true})
      window.Reveal.addEventListener('slidechanged', () => {//finished the transition to me
        window.Reveal.addEventListener('slidechanged', () => {//moving away from me
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
