import React from 'react';

class ShowUser extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '', 
            // location: ''
        }
    }
    render() {
        return (
            <div>User show page</div>
        )
    }
}

// All of users info
// List of their problems 

export default ShowUser;