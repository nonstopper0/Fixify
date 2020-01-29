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
    componentDidMount = (e) => {
        this.getProblemData()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.description]: e.target.value
        })
    }
    handleSubmit = async(e) => {
        this.setState({
            loading: true,
        })
        const info = {
            car: this.state.car, 
            price: this.state.price, 
            description: this.state.description,
            location: this.state.location, 
            owner: this.state.owner
        }
    }






    // }    
    // isFetching = () => {
    //   this.state.isFetching
    // }
    // componentDidMount() {
    //   this.fetchProblems(`localhost:3000/problem`), {
    //     method: "GET",
    //     mode: "cors",
    //     cache: "no-cache",
    //     headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(data)
    //     };
    //     return response.json();
    //   };
    //   render = () => {
    //     <div>
    //         <div>
    //             <Grid
    //                 textAlign='center'
    //                 style={{ marginTop: '15em', height: '100%' }}
    //                 verticalAlign='top'
    //                 stackable
    //                     >
    //                         {/* <Grid.Row>
    //                             <Button onClick={this.createProblem}>Create New Problem</Button>
    //                         </Grid.Row> */}
    //             <Grid.Row>
    //             <Grid.Column>
    //                 <h2>{this.state.car}</h2>
    //                 <h4>{this.state.price}</h4>
    //                 <h4>{this.state.description}</h4>
    //                 <h4>{this.state.location}</h4>
    //                 <h4>{this.state.owner}</h4>
    //             </Grid.Column>
    //                         {/* <Grid.Row>
    //                             <Button onClick={this.editProblem}>Edit Problem</Button>
    //                         </Grid.Row>  */}     
    //             </Grid.Row>
    //             </Grid>
    //             <Grid 
    //                 textAlign='center'
    //                 style={{ marginTop: '15em', height: '100%' }}
    //                 verticalAlign='top'
    //                 stackable   
    //             />  
    //         </div>     
    //     </div>
    // }} 

export default ShowProblem;