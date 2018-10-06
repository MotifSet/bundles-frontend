import React from 'react';
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';

export default class Sparklines extends React.Component {
  constructor(props){
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      containerDimensions: null
    }
  }

  componentDidMount(){
    this.setState({
      containerDimensions: {
        width: this.containerRef.current.offsetWidth,
        height: this.containerRef.current.offsetHeight
      }
    });
  }

  renderSvg(){
    const {data} = this.props;
    const {width, height} = this.state.containerDimensions;

    const xSelect = x => new Date(x.timestamp);
    const ySelect = y => y.price;

    const xScale = d3ScaleTime()
      .domain(d3ArrayExtent(data, xSelect))
      .range([0, width])
    ;
    const yScale = d3ScaleLinear()
      .domain(d3ArrayExtent(data, ySelect))
      .range([height/2, 0]);

    const selectScaledX = d => xScale(xSelect(d));
    const selectScaledY = d => yScale(ySelect(d));


    const sparkline = d3Line().x(selectScaledX).y(selectScaledY);
    const linePath = sparkline(data);

    return (
      <svg
        height={height/2}
        width={width}
        style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
      >
        <g><path d={linePath}></path></g>
      </svg>
    )
  }

  render(){
    return (
      <div ref={this.containerRef} style={{height: '100%', width: '100%'}}>
        {this.state.containerDimensions && this.props.data && this.renderSvg.bind(this)()}
      </div>
    )
  }
}
