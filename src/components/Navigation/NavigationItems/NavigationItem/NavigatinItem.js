import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

const NavigationItem = ({ link, exact, children, onlinkClick }) => {
      return (
            <li className={styles['nav__item']}>
                  <NavLink
                        to={link}
                        exact={exact}
                        className={styles['nav__link']}
                        onClick={onlinkClick}>
                        {children}
                  </ NavLink>
            </li>
      )
}

export default NavigationItem;