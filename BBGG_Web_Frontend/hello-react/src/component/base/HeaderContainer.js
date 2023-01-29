import React, { Component } from 'react';
import Header from './Header/Header';
import LoginButton from './Header/LoginButton';

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
             
             <LoginButton/>
            </Header>
        );
    }
}
export default HeaderContainer;