import React from 'react';
import {Grid, Row, Header, List, Segment} from 'semantic-ui-react';

class ShowUser extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '', 
            location: '' 
        }
    }
    getUserData = async(e) => {
        const url = await window.location.href.toString()
        const id = await url.match(/(?<=user\/).*$/)
        const response = await fetch(`http://localhost:8000/user/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedLoginResponse = await response.json()
        this.setState({
          username: parsedLoginResponse.data.username,
          location: parsedLoginResponse.data.location,
          email: parsedLoginResponse.data.email,
        })
    }
    componentDidMount = (e) => {
        this.getUserData()
    }
    render() {
        return (
            <div>
                { this.props.loggedIn
                        ?
                        <div>
                            <Grid
                                textAlign='center'
                                style={{ marginTop: '5em', height: '100%'}}
                                verticalAlign='top'
                                stackable
                            >
                                <Segment>
                                        <Header textAlign="center" as="h1"><span style={{"color":"green"}}>Fixify</span> User profile</Header>
                                        <List textAlign="left">
                                                <List.Item><h1>{this.state.username}</h1></List.Item>
                                                <List.Item><h3>{this.state.email}</h3></List.Item>
                                                <List.Item><h3>{this.state.location}</h3></List.Item>
                                        </List>
                                </Segment>
                            </Grid>
                        </div>     
                        :
                        this.props.history.push('/')
                        }
            </div>
        )
    }
}

export default ShowUser;