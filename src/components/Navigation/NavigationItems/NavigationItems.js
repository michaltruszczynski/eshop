import React from 'react';
import NavigationItem from './NavigationItem/NavigatinItem';

import styles from './NavigationItems.module.scss';

const navItems = [
      { id: 'home', text: 'Home', icon: false, link: '/', auth: false, role: [1, 2, 3] },
      { id: 'products', text: 'Products', icon: false, link: '/products', auth: false, role: [1, 2, 3] },
      { id: 'about', text: 'About', icon: false, link: '/about', auth: false, role: [1, 2, 3] },
      { id: 'contact', text: 'Contact', icon: false, link: '/contact', auth: false, role: [1, 2, 3] },
      { id: 'account', text: 'Account', icon: false, link: '/account', auth: true, role: [1, 2, 3] }
];

const NavigationItems = ({ isAuth, role, isMobileNavOpen, onMobileNavClick }) => {

      const userNavItems = navItems.filter(item => item.auth === isAuth && item.role.includes(role));
      const userNavLinks = userNavItems.map(item => (
            <NavigationItem
                  key={item.id}
                  link={item.link}
                  onLinkClick={onMobileNavClick}
            >
                  {item.text}
            </NavigationItem>
      ));

      let menuClasses = styles['menu'];
      if(isMobileNavOpen) {
            menuClasses = [styles['menu'], styles['menu--open-mobile']].join(' ')
      }

      return (
            <div className={menuClasses}>
                  <div className={styles['menu__heading-mobile']}>
                        <div className={styles['logo']}>
                              <h1 className={styles['logo__text']}>Codevo</h1>
                        </div>
                        <div className={styles['close-icon']} onClick={onMobileNavClick}>
                              <i className="bx bx-x"></i>
                        </div>
                  </div>
                  <ul className={styles['nav__list']}>
                        {userNavLinks}
                  </ul>
            </div>
      )
}

export default NavigationItems;