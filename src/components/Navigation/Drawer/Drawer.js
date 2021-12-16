import React, { Component } from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.module.css';

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false},
  { to: '/quiz-creator', label: 'Создать тест', exact: false}
];

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li  key={index}>
          <NavLink 
            exact={link.exact} 
            to={link.to}
            activeClassName={classes.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen  && <Backdrop onClick={this.props.onClose} /> }
      </>
    );
  }
}

export default Drawer;