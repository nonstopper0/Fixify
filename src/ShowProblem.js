import React from 'react';
import {Grid, Row} from 'semantic-ui-react'

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

render() {
    const { loggedIn } = this.props
    return (
        <div>
            { loggedIn
                    ?
                    <div>
                        <Grid
                            textAlign='center'
                            style={{ marginTop: '15em', height: '100%' }}
                            verticalAlign='top'
                            stackable
                        >
                            {/* <Grid.Row>
                                <Button onClick={this.createProblem}>Create New Problem</Button>
                            </Grid.Row> */}
                        <Grid.Row>
                            <Grid.Column>
                                <h2>{this.state.car}</h2>
                                <h4>{this.state.price}</h4>
                                <h4>{this.state.description}</h4>
                                <h4>{this.state.location}</h4>
                                <h4>{this.state.owner}</h4>
                            </Grid.Column>
                            {/* <Grid.Row>
                                <Button onClick={this.editProblem}>Edit Problem</Button>
                            </Grid.Row>  */}
                        </Grid.Row>
                        </Grid>
                        <Grid 
                            textAlign='center'
                            style={{ marginTop: '15em', height: '100%' }}
                            verticalAlign='top'
                            stackable   
                        />  
                    </div>     
                    :
                    'You must be logged in to view this page' 
                    }
        </div>
    )
}}

export default ShowProblem;