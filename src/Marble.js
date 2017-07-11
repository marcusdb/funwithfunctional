import React from 'react';

const Marble = (props) => (
  <g >
    <circle style={{
      fill: "#000"
    }} cx={10 + props.translate} cy="50" r="2"></circle>
    <text x={8 + props.translate} y="45" style={{
      fontFamily: 'Times New Roman',
      fontSize: '5px',
      fill: '#000'
    }}>{props.value}</text>

  </g>)

export default Marble  
