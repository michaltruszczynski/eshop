import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './ButtonLink.module.scss';

const ButtonLink = ({ link, children }) => {
      return (
            <NavLink to={link} className={styles['button-link']}>
                  {children}
            </NavLink>
      )
}

export default ButtonLink;