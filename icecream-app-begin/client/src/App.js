import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import IceCreamList from './components/IceCreamList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      iceCreamData: null,
      dataLoaded: false,
    }
  }

  componentDidMount() {
    fetch('/api/icecream')
      .then(res => res.json())
      .then(res => {
        this.setState({
          iceCreamData: res.data.icecreams,
          dataLoaded: true,
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          {(this.state.dataLoaded) 
            ? <IceCreamList allIceCreams={this.state.iceCreamData} /> 
            : <p>Loading...</p>}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
