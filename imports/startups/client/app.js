import React, { Component } from 'react';

import Header from '../../ui/components/header'
import Login from '../../ui/pages/login'

export default class App extends Component {
  render() {
    if (Meteor.userId()) {
      return (
        <div className='c-fit-app'>
          <Header />
          {this.props.children}
        </div>
      )
    } else {
      return (
        <Login />
      )
    }

  }
}
