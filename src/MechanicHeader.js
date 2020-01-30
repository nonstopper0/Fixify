import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container, Header, Icon} from 'semantic-ui-react'

function MechanicHeader(props) {
    const id = props.id
    const IdOfMechanic = `/mechanic/${id}` /*this.props.user.id*/
    return (
        <Menu size="large" fixed='top' inverted>
                <Header icon="wrench" style={{'margin': '4px', 'margin-left': '20px'}} as="h1" content="Fixify" color="green"></Header>
                <Menu.Menu position="right">
                <Menu.Item>
                    <Icon name='home' size='large' color="green"/>
                    <Link to ='/problems'>Problems</Link>
                </Menu.Item>
                <Menu.Item>
                    <Icon name='user' size='large' />
                    <Link to={IdOfMechanic}>Profile</Link>
                </Menu.Item>
                <div onClick={props.logout} style={{'color': 'white'}}>
                    <Menu.Item>
                        <Icon name='dont' size='large'/>
                        <Link to='/logout'>Logout</Link>
                    </Menu.Item>
                </div>
                </Menu.Menu>
        </Menu>
    )
}

export default MechanicHeader;