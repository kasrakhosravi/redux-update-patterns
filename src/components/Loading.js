/**
 * Import dependencies
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

/**
 * Import assets
 */
import logo from '../assets/logo.png';

/**
 * Primitives
 */
const LogoLink = styled(Link)`

`;

const Logo = styled.img`
  max-width: 100%;
  padding: 20px 0;
`;

class Loading extends Component {
  render() {
    return (
      <div style={{ color: '#fff',
          backgroundColor: '#222',
          height: '100vh',
          padding: '50px',
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center' }}>
        <LogoLink to="/">
          <Logo src={logo} alt="logo" />
        </LogoLink>
        {this.props.children}
      </div>
    );
  }
}

export default Loading;
