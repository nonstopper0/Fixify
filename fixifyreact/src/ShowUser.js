import React from 'react';
import {Grid, Row, Header, List, Segment, Message, Icon} from 'semantic-ui-react';
import LoadingScreen from './LoadingScreen';


class ShowUser extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '', 
            location: '',
            loading: true,
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
        if (parsedLoginResponse.status.code === 200) {
            this.setState({
                username: parsedLoginResponse.data.username,
                location: parsedLoginResponse.data.location,
                email: parsedLoginResponse.data.email,
              })
        } else {
            console.log(parsedLoginResponse.status.message);
        }
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 500)
    }
    componentDidMount = (e) => {
        this.getUserData()
    }
    render() {
        return (
            <div>
                {!this.state.loading ? 
                <Grid
                    textAlign='center'
                    style={{ marginTop: '5em', height: '100%'}}
                    verticalAlign='top'
                    stackable
                    >
                        <Segment>
                                <Header as="h1"><span style={{"color":"green"}}>Fixify</span> User profile</Header>
                                <List>
                                        <List.Item icon="user" as="h2" content={this.state.username} />
                                        <List.Item icon="mail" as="h2" content={this.state.email}/>
                                        <List.Item icon="map marker alternate" as="h2" content={this.state.location}/>
                                </List>
                        </Segment>
                    </Grid>  
            :
            <LoadingScreen />
        }
        </div>
        )
    }
}
export default ShowUser;