import React from 'react';

const Marble = (props) => (
  <g >
    <circle style={{
      fill: "#a6e22e"
    }} cx={props.offset+10 + props.translate} cy="25" r="10"></circle>
    <text x={props.offset+6 + props.translate} y="10" style={{
      fontFamily: 'Times New Roman',
      fontSize: '14px',
      fill: '#fff'
    }}>{props.value}</text>

  </g>)

export default Marble
