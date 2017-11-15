import React, { Component } from 'React'
import Clock from './clock.js'

export default class Zoned extends COmponent {
  constructor() {
    super()

    this.state = {
      timezones: ['America/Los_Angeles']
    }

    fetch('/timezones')
    .then(res => res.json())
    .then(timezones => (this.state.timezones = timezones))
  }

  render() {
    return <Clock timezone={this.state.timezone[0]}
  }
}
