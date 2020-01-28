import React from 'react';
import { Button, Form, Grid, Header, Message, Segment, Dropdown} from 'semantic-ui-react'

class LogRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            location: '',
            type: '',
            /* what action the user wants to perform */
            action: 'login',
            message: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.action === 'login') {
            this.login({
                username: this.state.username.toLowerCase(),
                password: this.state.password,
                type: this.state.type.toLowerCase()
            })
        } else if (this.state.action === "register") {
            this.register({
                username: this.state.username.toLowerCase(),
                password: this.state.password,
                email: this.state.email.toLowerCase(),
                location: this.state.location,
                type: this.state.type.toLowerCase()
            })
        }
    }
    register = async (info) => {
        const response = await fetch(`http://localhost:8000/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        const parsedRegisterResponse = await response.json() 
        if (parsedRegisterResponse.status.code === 200) {
            if (this.state.type.toLowerCase() === "mechanic") {
                this.props.history.push('/problems')
            } else if (this.state.type.toLowerCase() === "user") {
                this.props.history.push('/user')
            }
            this.props.loginfunc({id: parsedRegisterResponse.status.id, type: info.type})
        } else {
            this.setState({
                message: "This username or email has been taken"
            })
        }
    }
    login = async (info) => {
        const response = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedLoginResponse = await response.json()
        if (parsedLoginResponse.status.code === 200) {
            if (this.state.type.toLowerCase() === "mechanic") {
                this.props.history.push('/problems')
            } else if (this.state.type.toLowerCase() === "user") {
                this.props.history.push('/user')
            }
            this.props.loginfunc({id: parsedLoginResponse.status.id, type: info.type})
        } else {
            this.setState({
                message: "Sorry this username or password is incorrect"
            })
        }
    }
    changeAction = (e) => {
        if (this.state.action === "login") {
            this.setState({
                action: "register",
                message: ''
            })
        } else {
            this.setState({
                action: "login",
                message: ''
            })
        }
    }
    render(){
        return(
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 400, margin: 40}}>
                    <Header as="h2" textAlign="center">
                        Login
                    </Header>
                    <Header>
                        {this.state.message}
                    </Header>
                    <Button 
                        fluid size="large" 
                        onClick={this.changeAction}> {this.state.action === "login" ? "Not a user? Register here" : "Already a User, Login here" } 
                    </Button>
                    <Segment>
                        <Form size="large" onSubmit={this.handleSubmit} required>
                        { this.state.action === "register" ? 
                            <Form.Input 
                            fluid
                            required
                            icon="mail"
                            iconPosition="left"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            name="email"
                            />
                            : null }
                            <Form.Input    
                                fluid
                                icon="user"
                                iconPosition='left'
                                placeholder='username'
                                value={this.state.username}
                                onChange={this.handleChange}
                                name="username"
                                required
                            />
                            <Form.Input 
                                fluid
                                icon='lock'
                                type="password"
                                iconPosition='left'
                                placeholder='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                                required
                            />
                        { this.state.action === "register" ? 
                            <Form.Input 
                            required
                            fluid
                            icon="location arrow"
                            iconPosition="left"
                            placeholder="City, State"
                            value={this.state.location}
                            onChange={this.handleChange}
                            name="location"
                            />
                            : null }
                            <Form.Input 
                            fluid
                            icon="wrench"
                            iconPosition="left"
                            placeholder="mechanic or user"
                            value={this.state.type}
                            onChange={this.handleChange}
                            name="type"
                            required
                            />
                        {/* Check if minimum fields have been info */}
                        { this.state.action == "login" && this.state.username && this.state.password && this.state.type || this.state.action == "register" && this.state.username && this.state.password && this.state.type && this.state.location ?
                        <Button onClick={this.handleSubmit} color="green" fluid size="large">
                            {this.state.action === "login" ? "Login" : "Register"}
                        </Button>
                        :
                        null 
                        }
                        </Form>

                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default LogRegister;