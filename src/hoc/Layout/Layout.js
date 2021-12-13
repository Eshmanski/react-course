import React, { Component } from 'react';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import classes from './Layout.module.css';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: false
    }
  }

  toggleMenuHandler = () => {
    console.log('1')
    this.setState({
      menu: !this.state.menu
    });
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  }

  render() {
    return (
      <div className={classes.Layout}>

        <Drawer 
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
       />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;