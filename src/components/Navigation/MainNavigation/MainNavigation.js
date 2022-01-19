import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import CartIcon from '../CartIcon/CartIcon';
import UserIcon from '../UserIcon/UserIcon';

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

      const closeMobileNav = () => {
            setMobileNavOpen(false);
      }

      const mobileNavHandler = () => {
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
                              <Backdrop show={mobileNavOpen} onBackdropClick={closeMobileNav} />
                              <NavigationItems isAuth={false} role={1} isMobileNavOpen={mobileNavOpen} closeMobileNav={closeMobileNav} />
                              <NavLink to="/signin" className={styles['user-icon']}>
                                    <UserIcon />
                              </NavLink>
                              <NavLink to="/cart" className={styles['cart-icon']}>
                                    {/* <i className="bx bx-shopping-bag"></i> */}
                                    <CartIcon />
                              </NavLink>
                              <div className={styles['hamburger-icon']} onClick={mobileNavHandler}>
                                    <i className="bx bx-menu"></i>
                              </div>
                        </div>
                  </div>
            </nav>
      )
}

export default MainNavigation;