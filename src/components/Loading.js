import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <>
        <div className="lds-default">
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
          <div>.</div>
        </div>
        <div className="carregando">Carregando...</div>
      </>
    );
  }
}

export default Loading;
