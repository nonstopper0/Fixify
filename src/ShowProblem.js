import React from 'react';
import {Grid, Row, Header, List, Segment, Form, Icon, Modal, Button, TextArea, Text} from 'semantic-ui-react';

class ShowProblem extends React.Component {
    constructor() {
        super()
        this.state = { 
            car: '', 
            price: '', 
            description: '', 
            location: '', 
            owner: ''
        }
    }

    getProblems = async(e) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/problem/`, {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/problem/${id}`, {
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

    componentDidMount = async(e) => {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/problem/`, {
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

render() {
    const buttonStyle = {
        "margin-top": "18px"
    }
    return (
        <div>
            {this.props.loggedIn ?
                <Modal trigger={<Button color="green"  style={buttonStyle}>Create Problem</Button>}>
                    <Segment>
                        <Header as="h1">Create a <span style={{"color":"green"}}>Problem</span></Header>
                            <Form size="large" onSubmit={this.handleProblemSubmit}      required>
                            <Form.Input 
                                label="Problem"
                                icon="wrench"
                                iconPosition="left"
                                placeholder="Suspension Problem, Break repair, Bumper   repair"
                                value={this.state.title}
                                onChange={this.handleChange}
                                name="title"
                            />
                            <Form.Field
                                control={TextArea}
                                label="Description" 
                                placeholder="My front left suspension is in need    ofrepair"
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
                        { this.state.car && this.state.description && this.state.price && this.state.location && this.state.owner  ? 
                        <Button color="green" fluid size="large">
                            Create
                        </Button>
                            :
                            null
                            }
                            </Form>
                        :
                        null
                        }
                </Segment>
                </Modal>
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
}}

export default ShowProblem;