import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import styles from './MainNavigation.module.scss';

const MainNavigation = () => {
      const [navFixed, setNavFixed] = useState(false);
      const [mobileNavOpen, setMobileNavOpen] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  const navHeight = 1;
                  const currentScrolPosition = window.pageYOffset;
                  setNavFixed(currentScrolPosition > navHeight);
            }

            window.addEventListener('scroll', handleScroll);
            return () => {
                  window.removeEventListener('scroll', handleScroll);
            }
      }, []);

      const mobileNavOpenHandler = () => {
            setMobileNavOpen(mobileNavOpen => !mobileNavOpen);
      }

      let navClasses = styles['navigation'];

      if (navFixed) {
            navClasses = [styles['navigation'], styles['navigation--fixed']].join(' ');
      }

      return (
            <nav className={navClasses}>
                  <div className={styles['navigation__container']}>
                        <Logo />
                        <div className={styles['navigation__items']}>
                              <NavigationItems isAuth={false} role={1} isMobileNavOpen={mobileNavOpen} onMobileNavClick={mobileNavOpenHandler}/>
                              <NavLink to="/cart" className={styles['cart-icon']}>
                                    <i className="bx bx-shopping-bag"></i>
                              </NavLink>
                              <div className={styles['hamburger-icon']} onClick={mobileNavOpenHandler}>
                                    <i className="bx bx-menu"></i>
                              </div>
                        </div>
                  </div>
            </nav>
      )
}

export default MainNavigation;