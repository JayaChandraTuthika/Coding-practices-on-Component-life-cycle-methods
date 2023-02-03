import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isRunning: false, minutes: 25, seconds: 0, timerLimit: 25}

  onDecreaseMinutes = () => {
    const {minutes, isRunning} = this.state
    if (minutes > 0 && isRunning === false) {
      this.setState({seconds: 0})
      this.setState(prev => ({
        minutes: prev.timerLimit - 1,
        timerLimit: prev.timerLimit - 1,
      }))
    }
  }

  onIncreaseMinutes = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.setState({seconds: 0})
      this.setState(prev => ({
        minutes: prev.timerLimit + 1,
        timerLimit: prev.timerLimit + 1,
      }))
    }
  }

  startOrStopTimer = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.timerId = setInterval(this.tick, 1000)
      this.setState({isRunning: true})
    } else {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    }
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      isRunning: false,
      minutes: 25,
      seconds: 0,
      timerLimit: 25,
    })
  }

  tick = () => {
    const {seconds} = this.state
    if (seconds > 0) {
      this.setState(prev => ({seconds: prev.seconds - 1}))
    } else {
      const {minutes} = this.state
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timerId)
        this.setState({isRunning: false, seconds: 0})
      } else {
        this.setState({seconds: 59})
        this.setState(prev => ({minutes: prev.minutes - 1}))
      }
    }
  }

  render() {
    const {isRunning, minutes, seconds, timerLimit} = this.state

    const startOrStopImgUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const minutesInFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInFormat = seconds > 9 ? seconds : `0${seconds}`
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="second-main-container">
          <div className="timer-bg">
            <div className="timer-text-container">
              <h1 className="timer-text">
                {minutesInFormat}:{secondsInFormat}
              </h1>
              <p className="timer-state-text">
                {isRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="controls-container">
            <div className="buttons-container">
              <button
                type="button"
                className="start-pause-buttons"
                onClick={this.startOrStopTimer}
              >
                <img
                  src={startOrStopImgUrl}
                  alt={isRunning ? 'pause icon' : 'play icon'}
                  className="button-img"
                />
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                type="button"
                className="start-pause-buttons"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="button-img"
                />
                Reset
              </button>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="increase-decrease-container">
              <button
                type="button"
                className="plus-or-minus"
                onClick={this.onDecreaseMinutes}
              >
                -
              </button>
              <p className="minutes-adjust">{timerLimit}</p>
              <button
                type="button"
                className="plus-or-minus"
                onClick={this.onIncreaseMinutes}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
