import React from 'react';
import {Grid, Row, Header, List, Segment, Form, Icon, Modal, Button, TextArea} from 'semantic-ui-react';
import LoadingScreen from './LoadingScreen';


class ShowUser extends React.Component {
    constructor() {
        super()
        this.state = {
            // user data below
            username: '',
            email: '', 
            location: '',
            loading: true,
            // problem data below
            title: '',
            car: '',
            price: '',
            description: '',
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
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async(e) => {
        this.setState({
            loading: true,
        })
        const info = {
            title: this.state.title,
            description: this.state.description,
            car: this.state.car,
            location: this.state.location,
            price: this.state.price.toString(),
            owner_username: this.state.username,
            mechanic_username: ''
        }
        const response = await fetch(`http://localhost:8000/problem/`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedProblemResponse = await response.json()
        if (parsedProblemResponse.status.code === 200) {
            console.log("creation of problem successful: ", parsedProblemResponse)
        } else {
            console.log("creation of problem failed: ", parsedProblemResponse)
        }      
        this.setState({
            loading: false,
        })
    }
    render() {
        return (
            <div>
                {!this.state.loading ? 
                <Grid textAlign='center' style={{ marginTop: '5em', height: '100%'}} verticalAlign='top' stackable>
                        <Segment>
                                <Header as="h1"><span style={{"color":"green"}}>Fixify</span> User profile</Header>
                                <List>
                                        <List.Item icon="user" as="h2" content={this.state.username} />
                                        <List.Item icon="mail" as="h2" content={this.state.email}/>
                                        <List.Item icon="map marker alternate" as="h2" content={this.state.location}/>
                                </List>
                            {this.props.loggedIn ?
                            <Modal trigger={<Button color="green" fluid style={{"margin-top":"30px"}}>Create Problem</Button>}>
                                <Segment>
                                    <Header as="h1">Create a <span style={{"color":"green"}}>Problem</span></Header>
                                    <Form size="large" onSubmit={this.handleSubmit} required>
                                    <Form.Input 
                                    label="Problem"
                                    icon="wrench"
                                    iconPosition="left"
                                    placeholder="Suspension Problem, Break repair, Bumper repair"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    name="title"
                                    />
                                    <Form.Field
                                    control={TextArea}
                                    label="Description" 
                                    placeholder="My front left suspension is in need of repair"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    name="description"
                                    style={{'height': '100px'}}
                                    /> 
                                    <Form.Input
                                    label="Vehicle" 
                                    icon="car"
                                    iconPosition="left"
                                    placeholder="Year, Make, Model"
                                    value={this.state.car}
                                    onChange={this.handleChange}
                                    name="car"
                                    /> 
                                    <Form.Input
                                    type="number"
                                    label="Price" 
                                    icon="money"
                                    iconPosition="left"
                                    placeholder="0"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    name="price"
                                    /> 
                                    <Form.Input
                                    label="Location"
                                    icon="map marker alternate"
                                    iconPosition="left"
                                    placeholder={this.state.location}
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    name="location"
                                    /> 
                                    { this.state.car && this.state.title && this.state.description && this.state.price && this.state.location  ? 
                                    <Button onClick={this.handleSubmit} color="green" fluid size="large">
                                        Create
                                    </Button>
                                    :
                                    null
                                    }
                                    </Form>
                                </Segment>
                            </Modal>
                            : null }
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