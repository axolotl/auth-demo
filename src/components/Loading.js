import React, { Component } from 'react';

const divStyle = {
  marginTop: '60px',
  textAlign: 'center',
}

class Loading extends Component {
  state = {
    loading: '',
  }

  componentDidMount() {
    this.countdown = setInterval(() => this.interval(), 300);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  interval = () => {
    const { loading } = this.state;
    if (loading.length < 6) {
      this.setState({ loading: loading.concat(' .') })
    }
    else (
      this.setState({ loading: '' })
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div style={divStyle}>
        <p>Project is hosted on a free Heroku dyno, which sleeps after inactivity. It may take a brief momenent to wake up. Sorry for the delay.</p>
        <p>loading{loading}</p>
      </div>
    )
  }
};

export default Loading;
