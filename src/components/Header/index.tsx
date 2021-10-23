import React from 'react';

import logo from '../../assets/logo.png';
import './style.css'

export const Header = (): any => {
  return (
    <header className="main">
      <h1 className="title">Record Screen</h1>
      <img src={logo} alt="logo"/>
    </header>
  )
}