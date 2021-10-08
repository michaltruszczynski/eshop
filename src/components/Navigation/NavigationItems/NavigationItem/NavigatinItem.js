import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import SubNavigationItem from '../SubNavigationItem/SubNavigationItem';

import useClickOutside from '../../../../hooks/useClickOutside';
import styles from './NavigationItem.module.scss';

const NavigationItem = ({ link, exact, children, subMenu, closeMobileNav }) => {

      const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
      const linkContainerRef = useRef();

      const closeSubMenu = () => {
            setSubMenuIsOpen(false);
      }

      useClickOutside(linkContainerRef, closeSubMenu);

      const navLinkClickHandler = () => {
            setSubMenuIsOpen(state => !state);
      }

      const getNavItemClasses = () => {
            let navItemClasses = [styles['nav__item']]
            if (subMenuIsOpen) {
                  navItemClasses.push(styles['nav__item--open'])
            }
            return navItemClasses.join(' ')
      }

      const renderLinkComonent = () => {
            if (link) {
                  return (
                        <NavLink
                              to={link}
                              exact={exact}
                              className={styles['nav__link']}
                              onClick={subMenu.length ? navLinkClickHandler : undefined}
                              >
                              {children}
                        </NavLink>
                  )
            }
            return (
                  <div
                        className={styles['button__link']}
                        onClick={subMenu.length ? navLinkClickHandler : undefined}>
                        {children}
                  </div>
            )
      }


      return (
            <li className={getNavItemClasses()} ref={linkContainerRef}>
                  {renderLinkComonent()}
                  {subMenu.length ? <SubNavigationItem subMenu={subMenu} isOpen={subMenuIsOpen} onSubNavItemClick={closeSubMenu} closeMobileNav={closeMobileNav} /> : null}
            </li>
      )
}

export default NavigationItem;