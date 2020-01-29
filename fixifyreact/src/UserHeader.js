import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Menu, Icon} from 'semantic-ui-react'

function UserHeader(props) {
    const id = props.id
    const IdOfUser = `/user/${id}` /*this.props.user.id*/
    return (
        <Menu size="large" fixed='top' inverted>
                <Header icon="wrench" style={{'margin': '4px', 'margin-left': '20px'}} as="h1" content="Fixify" color="green"></Header>
                <Menu.Menu position="right">
                <Menu.Item>
                    <Icon name='home' color="green" size='large' />
                    <Link to={IdOfUser}>Home</Link>
                </Menu.Item>
                <div onClick={props.logout} style={{'color': 'white'}}>
                    <Menu.Item>
                        <Icon name='dont' size='large'/>
                        <Link to='/logout'>Logout</Link>
                    </Menu.Item>
                </div>
                </Menu.Menu>
        </Menu>
<<<<<<< HEAD
        </Header>
=======
>>>>>>> 7d0f66c37232f5d2f5ae12a296da9e56e188ea53
    )
}

export default UserHeader