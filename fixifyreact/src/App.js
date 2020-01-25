import React from 'react';
import './css/App.css';
import {Route, Switch} from 'react-router-dom';
import UserHeader from './UserHeader';
import LogRegister from './LogRegister.js'
import ShowUser from './ShowUser.js'
import MechanicHeader from './MechanicHeader.js';

class App extends React.Component {
  constructor() {
    super()
    this.state={
      // user or mechanic? if this is true it is a user
      user: false,
      // keep track if user is logged
      logged: true,
      // logged user username
      loggedUser: null,
    }
  }
  render(){
    return (
      <React.Fragment>
          {/* if user is logged in, show the userheader, if the mechanic is logged in, show the mechanic header */}
          {this.state.logged && this.state.user ? <UserHeader user={this.state.user}></UserHeader> : null }
          {this.state.logged && !this.state.user ? <MechanicHeader user={this.state.user}></MechanicHeader> : null }
          <Switch> 
            <Route exact path="/" render={(props) => <LogRegister {...props} logged={this.state.logged} />}></Route>
            <Route exact path="/problems"></Route>
          </Switch>
      </React.Fragment>
    )
  }
}

export default App;
