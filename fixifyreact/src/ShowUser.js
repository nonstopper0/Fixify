import React from 'react';

class ShowUser extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '', 
            location: '' 
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
                                    <h2>{this.state.username}</h2>
                                    <h4>{this.state.email}</h4>
                                    <h4>{this.state.location}</h4>
                            </Grid.Column>
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
}
}

export default ShowUser;