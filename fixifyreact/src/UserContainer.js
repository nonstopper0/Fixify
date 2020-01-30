import React from 'react';
import {Grid, Row, Header, List, Segment, Form, Icon, Modal, Button, TextArea, Text} from 'semantic-ui-react';
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
            problems: [],
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
        console.log(parsedLoginResponse.data.id)
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
    getProblems = async(e) => {
        const response = await fetch(`http://localhost:8000/problem/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })       
        const parsedProblems = await response.json()
        const parsedProblemsData = parsedProblems.data
        const userProblems = await parsedProblemsData.filter((problem) => {
            if (problem['owner_username'] === this.state.username) {
                return problem
            }
        })
        await this.setState({
            problems: [...userProblems]
        })
    }
    deleteProblem = async(id) => {
        const response = await fetch(`http://localhost:8000/problem/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })     
        const parsedResponse = await response.json()
        if (parsedResponse.status.code === 200) {
            console.log(parsedResponse)
        } else {
            console.log('delete problem failed', parsedResponse)
        }
    }
    updateRender = (e) => {
        const items = this.state.problems.map((problem) => {
            return <Segment>
                <List.Item>
                    <Header>
                    {problem.title}
                    </Header>
                    <span style={{'color':'green'}}>Vehicle:</span> {problem.car}
                    <Modal trigger={<Button style={{'position': 'relative', 'float': 'right', 'top': '-25px'}}size="medium" color="green">View</Button>}>
                        <Segment>
                            <Header as="h1">{problem.title}</Header>
                            <Header as="h3">{problem.car}</Header>
                            <List>
                                <List.Item as="p"content={problem.description}></List.Item>
                                <List.Item icon="large map marker alternate" as="h2"content={problem.location}></List.Item>
                                <List.Item style={{'float': 'right'}} icon="money" as="h1" iconPosition="left"content={problem.price}></List.Item>
                                <List.Item icon="wrench" as="h1" content={problem.mechanic_username ? problem.mechanic_username : "not claimed yet"}></List.Item>
                            </List>
                        </Segment>
                    </Modal>
                    
                </List.Item>
                </Segment>
        })
        return items
    }
    componentDidMount = async(e) => {
        await this.getUserData()
        await this.getProblems()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleProblemSubmit = async(e) => {
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
            console.log("creation of problem succesful: ", parsedProblemResponse)
        } else {
            console.log("creation of problem failed: ", parsedProblemResponse)
        }      
        this.setState({
            loading: false,
            car: '',
            description: '',
            title: '',
            price: '',
        })
        this.getProblems()
    }
    handleEditSubmit = async(e) => {
        this.setState({
            loading: true
        })
        const info = { location: this.state.location }
        const id = this.props.id 
        const response = await fetch(`http://localhost:8000/user/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedEditResponse = await response.json()
        if (parsedEditResponse.status.code === 200) {
            console.log('Edited user succesfully: ', parsedEditResponse);
        } else {
            console.log('Edit of user failed: ', parsedEditResponse);
        }
        this.setState({
            loading: false
        })
    }
    render() {
        const buttonStyle = {
            "margin-top": "18px"
        }
        return (
            <div>
                {!this.state.loading ? 
                        <Segment style={{'margin': '50px'}}>
                                <Header as="h1"><span style={{"color":"green"}}>Fixify</span> User profile</Header>
                                <List>
                                        <List.Item icon="user" as="h2" content={this.state.username} />
                                        <List.Item icon="mail" as="h2" content={this.state.email}/>
                                        <List.Item icon="map marker alternate" as="h2" content={this.state.location}/>
                                </List>

                            {this.props.loggedIn ?
                            <Modal trigger={<Button color="green"  style={buttonStyle}>Create Problem</Button>}>
                                <Segment>
                                    <Header as="h1">Create a <span style={{"color":"green"}}>Problem</span></Header>
                                    <Form size="large" onSubmit={this.handleProblemSubmit} required>
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
                                    { this.state.car && this.state.title && this.state.description && this.state.price && this.state.location  ? 
                                    <Button color="green" fluid size="large">
                                        Create
                                    </Button>
                                    :
                                    null
                                    }
                                    </Form>
                                </Segment>
                            </Modal>
                            : null }

                            {this.props.loggedIn ? 
                            <Modal trigger={<Button color="grey" style={buttonStyle}>Edit Profile</Button>}>
                                <Segment>
                                    <Header as="h1">Edit Profile</Header>
                                    <Form size="large" onSubmit={this.handleEditSubmit} required>
                                        <Form.Input 
                                        label="location"
                                        icon="map marker alternate"
                                        iconPosition="left"
                                        placeholder={this.state.location}
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        name="location"
                                        />
                                    {this.state.location ? 
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
            :
            <LoadingScreen />
        }
        <Segment style={{'margin': '50px'}}>
            <Header as="h1"><span style={{"color":"green"}}>Problems</span></Header>
            <List>
            { this.updateRender()}
            </List>
        </Segment>
        </div>
        )
    }
}
export default ShowUser;