import React from 'react';
import {Grid, Row, Header, List, Segment, Form, Icon, Modal, Button, TextArea, Text} from 'semantic-ui-react';

class ShowProblem extends React.Component {
    constructor() {
        super()
        this.state = { 
            problems: []
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
        console.log(parsedProblemsData)
        if (parsedProblems.status.code === 200) {
            await this.setState({
                problems: [...parsedProblemsData]
            })
        } else {
            console.log('fetch failed: ', parsedProblems)
        }
    }

    componentDidMount = async(e) => {
        await this.getProblems()
    }

    handleClaim = async(id) => {
        const username = await this.props.username
        console.log(username)
        const body = await{
            mechanic_username: username
        }
        console.log(body)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/problem/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })       
        const parsedProblems = await response.json()
        const parsedProblemsData = parsedProblems.data
        console.log(parsedProblemsData)
        if (parsedProblems.status.code === 200) {
            console.log('you have claimed this problem')
        } else {
            console.log('fetch failed: ', parsedProblems)
        }
        this.getProblems()
    }       

    updateRender = (e) => {
        const items = this.state.problems.map((problem, index) => {
            return !problem.mechanic_username ? <Segment key={problem.id}>
                <List.Item key={index}>
                    <Header>
                    {problem.title} <span style={{'color':'green'}}>in</span> {problem.location}
                    </Header>
                    <span style={{'color':'green'}}>Vehicle:</span> {problem.car}
                    <Modal trigger={<Button style={{'position': 'relative', 'float': 'right', 'top': '-25px'}}size="medium" color="green">View</Button>}>
                        <Segment style={{'padding-bottom': '50px', 'border': '2px solid gray'}}>
                            <Header color="green" as="h1">{problem.title}</Header>
                            <Header as="h3">{problem.car}</Header>
                            <List>
                                <List.Item as="p"content={problem.description}></List.Item>
                                <List.Item icon="large map marker alternate" as="h2"content={problem.location}></List.Item>
                                <List.Item style={{'float': 'right'}} icon="green money" as="h1" content={problem.price}></List.Item>
                                <List.Item icon="wrench" as="h1"  content={problem.mechanic_username ? problem.mechanic_username : "not claimed yet"}></List.Item>
                            </List>
                            <Button color="green" style={{'float':'right'}}onClick={()=> { this.handleClaim(problem.id)}}>
                                Claim
                            </Button>
                        </Segment>
                    </Modal> 
                </List.Item>
                </Segment>
                :
                null 
        })
        return items
    }

    render() {
        return (
            <div>
            <Segment style={{'margin': '2%', 'marginTop': '70px'}}>
                <Header as="h1"><span style={{"color":"green"}}>Problems</span></Header>
                <List>
                { this.updateRender()}
                </List>
            </Segment>
            </div>
        )
    }}

export default ShowProblem;