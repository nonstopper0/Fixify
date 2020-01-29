import React from 'react';
import {Grid, Modal, Header, List, Segment, Form, Button} from 'semantic-ui-react';
import LoadingScreen from './LoadingScreen'


class ShowMechanic extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '', 
            location: '',
            specialities: '',
            loading: true,
        }
    }
    getMechanicData = async(e) => {
        const url = await window.location.href.toString()
        const id = await url.match(/(?<=mechanic\/).*$/)
        const response = await fetch(`http://localhost:8000/mechanic/${id}`, {
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
                specialities: parsedLoginResponse.data.specialities
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
    handleEditSubmit = async(e) => {
        this.setState({
            loading: true
        })
        const info = { location: this.state.location, specialities: this.state.specialities }
        const id = this.props.id 
        const response = await fetch(`http://localhost:8000/mechanic/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedEditResponse = await response.json()
        if (parsedEditResponse.status.code === 200) {
            console.log('Edited Mechanic succesfully: ', parsedEditResponse);
        } else {
            console.log('Edit of Mechanic failed: ', parsedEditResponse);
        }
        this.setState({
            loading: false
        })
    }      
    componentDidMount = (e) => {
        this.getMechanicData();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const buttonStyle = {
            "margin-top": "18px"
        }
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
                            <Header as="h1"><span style={{"color":"green"}}>Fixify</span> Mechanic profile</Header>
                            <List>
                                    <List.Item icon="wrench" as="h2" content={this.state.username} />
                                    <List.Item icon="mail" as="h2" content={this.state.email}/>
                                    <List.Item icon="map marker alternate" as="h2" content={this.state.location}/>
                                    <List.Item icon="tasks" as ="h2" content={this.state.specialities} />
                            </List>

                            {this.props.loggedIn ? 
                            <Modal trigger={<Button color="grey" fluid style={buttonStyle}>Edit Profile</Button>}>
                                <Segment>
                                    <Header as="h1">Edit Profile</Header>
                                    <Form size="large" onSubmit={this.handleEditSubmit} required>
                                        <Form.Input 
                                        label="Location"
                                        icon="map marker alternate"
                                        iconPosition="left"
                                        placeholder={this.state.location}
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        name="location"
                                        />
                                        <Form.Input 
                                        label="Specialities" 
                                        icon="tasks"
                                        iconPosition="left"
                                        placeholder="BMW, Ferrari, Lamborghini, Suspension, Brakes"
                                        value={this.state.specialities}
                                        onChange={this.handleChange}
                                        name="specialities"
                                        />
                                    {this.state.location && this.state.specialities ? 
                                    <Button color="green" fluid size="large">
                                        Edit Profile
                                    </Button> 
                                    : null }
                                    </Form>
                                </Segment>
                            </Modal>
                            :
                            null}

                        </Segment>
                    </Grid>  
            :
            <LoadingScreen />
        }
        </div>
        )
    }
}
export default ShowMechanic;