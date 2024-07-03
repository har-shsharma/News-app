import React, { Component } from 'react'
import Spinner from './Spinner.gif'

export class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Spinner} width='100rem' height='100rem' alt="Loading..."/>
      </div>
    )
  }
}

export default Loader
