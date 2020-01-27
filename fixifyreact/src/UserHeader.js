import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Menu, Icon} from 'semantic-ui-react'

function UserHeader() {
    const IdOfUser = `/user/${'test'}` /*this.props.user.id*/
    return (
        <Header>
        <Menu fixed='top' inverted>
                <Menu.Item>
                    <Icon name='user' size='large' />
                    <Link to={IdOfUser}>Home</Link>
                </Menu.Item>
                <Menu.Item positon="right">
                    <Icon name='dont' size='large'/>
                    <Link to='/logout'>Logout</Link>
                </Menu.Item>
        </Menu>
    </Header>
    )
}

export default UserHeader