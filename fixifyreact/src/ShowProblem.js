import React from 'react';
import {Grid, Row, GridColumn, Header, List, Segment, Form, Icon, Modal, Button, TextArea} from 'semantic-ui-react'; 
import LoadingScreen from './LoadingScreen';

class ShowProblem extends React.Component {
    constructor() {
        super()
        this.state = {
            car: '', 
            price: '', 
            description: '', 
            location: '', 
            owner: '', 
        }
    } 
    getProblemData = async(e) => {
        const url = await window.location.href.toString()
        const id = await url.match(/(?<=problem\/).*$/)
        const response = await fetch(`http://localhost:8000/problem/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const componentDidMount = (e) => {
        this.getProblemData()
    }
    const handleChange = (e) => {
        this.setState({
            [e.target.description]: e.target.value
        })
    }
    const handleProblemSubmit = async(e) => {
        this.setState({
            loading: true,
        })
        const info = {
            car: this.state.car, 
            price: this.state.price, 
            description: this.state.description,
            location: this.state.location, 
            owner: this.state.owner
        }}
    }
      render() {
        const buttonStyle = {
            "margin-top": "18px"
        }
        return (
            <div>
                {!this.state.loading ? 
                <Grid textAlign='center' style={{ marginTop: '5em', height: '100%'}} verticalAlign='top' stackable>
                        <Segment>
                                <Header as="h1"><span style={{"color":"green"}}>Fixify</span>Problems</Header>

                            {this.props.loggedIn ?
                            <Modal trigger={<Button color="green" fluid style={buttonStyle}>Create Problem</Button>}>
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

                        </Segment>
                    </Grid>  
            :
            <LoadingScreen />
        }
        </div>
        )
    }
}




//         <div>
//             <div>
//                 <Grid
//                     textAlign='center'
//                     style={{ marginTop: '15em', height: '100%' }}
//                     verticalAlign='top'
//                     stackable
//                         >
//                             {/* <Grid.Row>
//                                 <Button onClick={this.createProblem}>Create New Problem</Button>
//                             </Grid.Row> */}
//                 <Grid.Row>
//                 <Grid.Column>
//                     <h2>{this.state.car}</h2>
//                     <h4>{this.state.price}</h4>
//                     <h4>{this.state.description}</h4>
//                     <h4>{this.state.location}</h4>
//                     <h4>{this.state.owner}</h4>
//                 </Grid.Column>
//                             {/* <Grid.Row>
//                                 <Button onClick={this.editProblem}>Edit Problem</Button>
//                             </Grid.Row>  */}     
//                 </Grid.Row>
//                 </Grid>
//                 <Grid 
//                     textAlign='center'
//                     style={{ marginTop: '15em', height: '100%' }}
//                     verticalAlign='top'
//                     stackable   
//                 />  
//             </div>     
//         </div>
//     )}
// }

export default ShowProblem;