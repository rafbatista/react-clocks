/* global moment */

import React from 'react'
import ReactDOM from 'react-dom'

const $times = document.querySelector('.times')

class Clocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timezones: [{ zone: 'America/Los_Angeles' }]
    }
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  componentWillMount() {
    fetch('/timezones')
      .then(res => res.json())
      .then(timezones => this.setState({ timezones }))
  }

  componentDidMount() {
    setInterval(() => this.tick(), 16)
  }

  render() {
    return (
      <div className="times">
        {this.state.timezones.map(({ zone }, index) => (
          <div key={index} className="time-container">
            <div className="zone-time" key={index}>
              {zone.split('/')[1].replace('_', ' ')},{' '}
              {moment()
                .tz(zone)
                .format('h:mm:ss A')}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

ReactDOM.render(<Clocks />, $times)
