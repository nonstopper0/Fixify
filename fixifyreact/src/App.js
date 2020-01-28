import React from 'react';
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
      user: true,
      // keep track if user is logged
      logged: false,
      // logged user username
      loggedUser: null,
      loggedUserID: 0
    }
  }
  loginfunc = (data) => {
    console.log(data);
    let isUser = true;
    data['type'].toLowerCase() === "mechanic" ? isUser = false : isUser = true;
    this.setState({
      logged: true,
      loggedUser: data.username,
      user: isUser
    })
  }
  idfunc = (id) => {
    this.setState({
      loggedUserID: id
    })
    console.log(this.state.loggedUserID)
  }
  render(){
    return (
      <React.Fragment>
          {/* if user is logged in, show the userheader, if the mechanic is logged in, show the mechanic header */}
          {this.state.logged && this.state.user ? <UserHeader user={this.state.loggedUser} id={this.state.loggedUserID}></UserHeader> : null }
          {this.state.logged && !this.state.user ? <MechanicHeader user={this.state.loggedUser} id={this.state.loggedUserID}></MechanicHeader> : null }
          <Switch> 
            <Route exact path="/" render={(props) => <LogRegister {...props} logged={this.state.logged} loginfunc={this.loginfunc} idfunc={this.idfunc}/>}></Route>
            <Route exact path="/problems"></Route>
            <Route exact path="/user/:userid" render={(props => <ShowUser {...props} info={this.state.loggedUser}></ShowUser>)}></Route>
          </Switch>
      </React.Fragment>
    )
  }
}

export default App;
