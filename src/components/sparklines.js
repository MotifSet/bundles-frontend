import React from 'react';
import styled from 'styled-components';
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime
} from 'd3-scale';
import {
  axisBottom as d3AxisBottom,
} from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import { line as d3Line, area as d3Area } from 'd3-shape';

import { colors } from '../shared/theme';

export default class Sparklines extends React.Component {
  constructor(props){
    super(props);
    this.containerRef = React.createRef();
    this.xAxisRef = React.createRef();
    this.state = {
      containerDimensions: null
    };
  }

  componentDidMount(){
    this.setState({
      containerDimensions: {
        width: this.containerRef.current.offsetWidth,
        height: this.containerRef.current.offsetHeight
      }
    });

    this.props.onOffsetReceived && this.props.onOffsetReceived({height: this.containerRef.current.offsetHeight*.8})

    if(this.props.showAxis){
      setTimeout(this.renderSvg.bind(this), 250); // dirty hack to make the xAxis render by forcing a refresh
    }
  }

  componentDidUpdate(oldProps, oldState){
    if(!oldState.containerDimensions && this.state.containerDimensions && this.props.data){
      this.renderSvg();
    }
  }

  renderSvg(){
    const {data, id, showAxis} = this.props;
    const {width, height} = this.state.containerDimensions;

    if(!data) return;

    const xSelect = x => new Date(x.date);
    const ySelect = y => y.price;

    const xScale = d3ScaleTime()
      .domain(d3ArrayExtent(data, xSelect))
      .range([0, width])
    ;
    const yScale = d3ScaleLinear()
      .domain([d3ArrayExtent(data, ySelect)[0]*.75, d3ArrayExtent(data, ySelect)[1]*1.25])
      .range([height/2, 0]);

    const selectScaledX = d => xScale(xSelect(d));
    const selectScaledY = d => yScale(ySelect(d));


    const sparkline = d3Line().x(selectScaledX).y(selectScaledY);
    const linePath = sparkline(data);
    const areaPath = d3Area().x(d => xScale(new Date(d.date))).y0(yScale(0)).y1(d => yScale(d.price))(data);
    const xAxis = d3AxisBottom()
      .scale(xScale)
      .ticks(data.length/3);

    if (this.xAxisRef.current){
      d3Select(this.xAxisRef.current).call(xAxis);
    }

    const positive = data[0].price < data[data.length-1].price;

    return (
      <svg
        height={(height/2)*1.25}
        width={width}
        style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
      >
        <g>
          <path d={linePath} fill={"transparent"} stroke={positive ? colors.darkGreen : colors.darkRed} strokeWidth={2}/>
          <path d={areaPath} fill={`url(#areaGradient${id}`}/>
        </g>
        {showAxis && (
          <React.Fragment>
            <g className="xAxis" style={{transform: `translateY(${(height/2)}px)`}} ref={this.xAxisRef}></g>
          </React.Fragment>
        )}
        <defs>
          <linearGradient id={`areaGradient${id}`} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
            <stop offset={0} stopColor={positive ? colors.darkGreen : colors.darkRed} stopOpacity={0.5}></stop>
            <stop offset={0.2} stopColor={positive ? colors.lightGreen : colors.lightRed} stopOpacity={0.1}></stop>
            <stop offset={0.3} stopColor={'black'} stopOpacity={0.0}></stop>
          </linearGradient>
        </defs>
      </svg>
    )
  }

  render(){
    return (
      <div ref={this.containerRef} style={{height: '100%', width: '100%', marginTop: '1em'}}>
        {this.state.containerDimensions && this.props.data && this.renderSvg.bind(this)()}
      </div>
    )
  }
}
