import React from 'react';

class LogRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            location: '',
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
                password: this.state.password,
            })
        } else if (this.state.action === "register") {
            console.log('registering');
            this.register({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                location: this.state.location
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
            <div style={{'text-align': "center", "margin":"20px"}}>
                <button onClick={this.changeAction}> {this.state.action === "login" ? "Not a user? Register here" : "Already a User, Login here" } </button>
                <form onSubmit={this.handleSubmit}>
                    { this.state.action === "register" ? <input type="email" value={this.state.email} onChange={this.handleChange} name="email" placeholder="email"></input> : null }
                    <input type="text" value={this.state.username} onChange={this.handleChange} name="username" placeholder="username"></input>
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default LogRegister;