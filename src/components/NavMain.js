import React from 'react';
import { NavLink } from 'react-router-dom';

import { MenuBubblesView, MenuListView, MenuWorkflow } from './Icons';

import '../styles/css/nav-main.css';

/**
* NavMain
*
* Main navigation
*/

const NavMain = props => (
  <nav className="nav-main">
    <ul>
    <li>
      <NavLink to="/" activeClassName="active" exact>
        <div>
          <img src={MenuBubblesView} alt="Bubble View" />
        </div>
      </NavLink>
    </li>
    <li>
      <NavLink to="/list" activeClassName="active" exact>
        <div>
          <img src={MenuListView} alt="List View" />
        </div>
      </NavLink>
    </li>
    <li>
      <NavLink to="/grouping" activeClassName="active" exact>
        <div>
          <img src={MenuWorkflow} alt="Workflow" />
        </div>
      </NavLink>
    </li>
    </ul>
  </nav>
);

export default NavMain;
