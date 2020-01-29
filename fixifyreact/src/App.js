import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import UserHeader from './UserHeader';
import LogRegister from './LogRegister.js'
import ShowUser from './ShowUser.js'
import MechanicHeader from './MechanicHeader.js';
import ShowMechanic from './ShowMechanic.js';

class App extends React.Component {
  constructor() {
    super()
    this.state={
      // user or mechanic? if this is true it is a user
      user: true,
      // keep track if user is logged
      logged: false,
      // logged user username
      loggedID: 0,
    }
  }
  loginfunc = async(data) => {
      console.log('loginfunc data: ', data)
      let isUser = true;
      let id = data['id']
      if (data['type'] === "mechanic") {
          isUser = false
          this.props.history.push(`/mechanic/${id}`)
      } else if (data['type'] === "user") {
        this.props.history.push(`/user/${id}`)
      }
      this.setState({
        logged: true,
        // loggedUsername: n,
        user: isUser,
        loggedID: id
    })
  } 

  logoutFunc = async() => {
    const response = await fetch(`http://localhost:8000/logout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const parsedLogoutResponse = await response.json() 
    console.log(parsedLogoutResponse)
    if (parsedLogoutResponse.status.code === 200) {
      this.setState({
        logged: false,
        loggedID: 0,
      })
    }
    this.props.history.push('/')
  }
  render(){
    return (
      <React.Fragment>
          {/* if user is logged in, show the userheader, if the mechanic is logged in, show the mechanic header */}
          {this.state.logged && this.state.user ? <UserHeader user={this.state.loggedUser} id={this.state.loggedID} logout={this.logoutFunc}></UserHeader> : null }
          {this.state.logged && !this.state.user ? <MechanicHeader user={this.state.loggedUser} id={this.state.loggedID} logout={this.logoutFunc}></MechanicHeader> : null }
          <Switch> 
            <Route exact path="/" render={(props) => <LogRegister {...props} logged={this.state.logged} loginfunc={this.loginfunc} idfunc={this.idfunc}/>}></Route>
            <Route exact path="/problems"></Route>
            <Route exact path="/user/:id" render={(props => <ShowUser {...props} loggedIn={this.state.logged} id={this.state.loggedID}></ShowUser>)}></Route>
            <Route exact path="/mechanic/:id" render={(props => <ShowMechanic {...props} loggedIn={this.state.logged} id={this.state.loggedID}></ShowMechanic>)}></Route>
          </Switch>
      </React.Fragment>
    )
  }
}

export default withRouter(App);
