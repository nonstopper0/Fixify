import React from 'react';
import {Grid, Row, GridColumn} from 'semantic-ui-react'

class ShowProblem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            car: '', 
            price: '', 
            description: '', 
            location: '', 
            owner: '', 
            isFetching: false
        }
    }
    render = () => {
        this.state.problems  
    }
    isFetching = {
      this.state.isFetching
    }
    componentDidMount() {
      this.fetchProblems(`localhost:3000/problem`), {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        return response.json();
      };
      <div>
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
</div>

export default ShowProblem;