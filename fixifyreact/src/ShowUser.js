import React from 'react';

class ShowUser extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: ''
        }
    }
    render() {
        return (
            <div>User show page</div>
        )
    }
}

export default ShowUser;