import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from './Header';

class App extends React.Component {
  constructor() {
    super()
    this.state={
      user: true,
      logged: false,
      loggedUser: null,
    }
  }
  render(){
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}

export default App;
