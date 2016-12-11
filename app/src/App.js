import React, { Component } from 'react';
import ShortenerContainer from './components/shortener/ShortenerContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ShortenerContainer />
      </div>
    );
  }
}

export default App;
