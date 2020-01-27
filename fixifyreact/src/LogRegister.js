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
            action: 'login'
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
            console.log('loggin in')
            this.login({
                username: this.state.username,
                password: this.state.password
            })
        } else if (this.state.action === "register") {
            console.log('registering');
            this.register({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                location: this.state.location,
                type: this.state.type
            })
        }
    }
    register = async (info) => {
        console.log(info)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        const parsedRegisterResponse = await response.json()  
        if (parsedRegisterResponse.status.code === 200) {
            this.props.history.push('/problems')
            this.props.loginfunc(parsedRegisterResponse)
        } else {
            console.log('Register failed', parsedRegisterResponse);
        }
    }
    login = async (info) => {
        console.log(info)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const parsedLoginResponse = await response.json()
        if (parsedLoginResponse.staus.code === 200) {
            this.props.history.push('/user')
            this.props.loginfunc(parsedLoginResponse)
        } else {
            console.log('Login rejected: ', parsedLoginResponse)
        }
    }
    changeAction = (e) => {
        if (this.state.action === "login") {
            this.setState({
                action: "register"
            })
        } else {
            this.setState({
                action: "login"
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
                    <Button 
                        fluid size="large" 
                        onClick={this.changeAction}> {this.state.action === "login" ? "Not a user? Register here" : "Already a User, Login here" } 
                    </Button>
                    <Segment>
                        <Form size="large" onSubmit={this.handleSubmit}>
                        { this.state.action === "register" ? 
                            <Form.Input 
                            fluid
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
                            />
                        { this.state.action === "register" ? 
                            <Form.Input 
                            fluid
                            icon="location arrow"
                            iconPosition="left"
                            placeholder="City, State"
                            value={this.state.location}
                            onChange={this.handleChange}
                            name="location"
                            />
                            : null }
                        <Button onClick={this.handleSubmit} color="green" fluid size="large">
                            {this.state.action === "login" ? "Login" : "Register"}
                        </Button>
                        </Form>

                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default LogRegister;