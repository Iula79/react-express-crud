import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import IceCreamList from './components/IceCreamList';
import IceCreamForm from './components/IceCreamForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      iceCreamData: null,
      dataLoaded: false,
      shouldShowAddForm: false,
    }
    this.iceCreamSubmit = this.iceCreamSubmit.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.deleteIceCream = this.deleteIceCream.bind(this);
  }

  componentDidMount() {
    this.getAllIceCreams();
  }

  getAllIceCreams() {
    fetch('/api/icecream')
    .then(res => res.json())
    .then(res => {
      this.setState({
        iceCreamData: res.data.icecreams,
        dataLoaded: true,
        shouldShowAddForm: false,
        currentlyEditing: null,
      })
    })
  }

  iceCreamSubmit(method, event, data, id) {
    event.preventDefault();
    fetch(`/api/icecream/${id || ''}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        this.getAllIceCreams();
      });
  }

  deleteIceCream(id) {
    fetch(`/api/icecream/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(res => {
      this.getAllIceCreams();
    });
  }

  showAddForm() {
    this.setState({
      shouldShowAddForm: true,
    });
  }

  setEditing(id) {
    this.setState({
      currentlyEditing: id,
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="form-holder">
          {this.state.shouldShowAddForm 
            ? <IceCreamForm isAdd={true} /> 
            : <button onClick={this.showAddForm}>Add an Ice Cream!</button>
          }
        </div>
        <div className="container">
          {(this.state.dataLoaded) 
            ? <IceCreamList allIceCreams={this.state.iceCreamData} currentlyEditing={this.state.currentlyEditing} setEditing={this.setEditing} iceCreamSubmit={this.iceCreamSubmit} deleteIceCream={this.deleteIceCream} /> 
            : <p>Loading...</p>}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
