import React from 'react';

export default class BasketDetail extends React.Component{
  render(){
    return (
      <div>
        <h1>WASSSUP</h1>
        <span>{this.props.toString()}</span>
      </div>
    )
  }
}
