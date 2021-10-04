import React from 'react';
import NavigationItem from './NavigationItem/NavigatinItem';

import styles from './NavigationItems.module.scss';

const navItems = [
      { id: 'home', text: 'Home', icon: false, link: '/', auth: [false, true], role: [1, 2, 3] },
      {
            id: 'products', text: 'Products', icon: false, link: '', auth: [false, true], role: [1, 2, 3], subMenu: [
                  { id: 'productsList', text: 'Products List', link: '/products', auth: [false, true], role: [1, 2, 3] },
                  { id: 'addProduct', text: 'Add Product', link: '/addproduct', auth: [false, true], role: [1, 2, 3] }
            ]
      },
      {
            id: 'brands', text: 'Brands', icon: false, link: '', auth: [false, true], role: [1, 2, 3], subMenu: [
                  { id: 'brandsList', text: 'Brands List', link: '/brands', auth: [false, true], role: [1, 2, 3] },
                  { id: 'addBrand', text: 'Add Brand', link: '/addbrand', auth: [false, true], role: [1, 2, 3] }
            ]
      },
      {
            id: 'SizeSystems', text: 'Size Systems', icon: false, link: '', auth: [false, true], role: [1, 2, 3], subMenu: [
                  { id: 'sizeSystemsList', text: 'Size Systems List', link: '/sizesystems', auth: [false, true], role: [1, 2, 3] },
                  { id: 'addSizeSystem', text: 'Add Size System', link: '/addsizesystem', auth: [false, true], role: [1, 2, 3] }
            ]
      }
]

const NavigationItems = ({ isAuth, role, isMobileNavOpen, closeMobileNav }) => {

      const filterNavItemsByRoleAndAuthStatus = (navItems, role, isAuth) => {
            if (!navItems.length) return [];
            return navItems.filter(item => {
                  if (!(item.auth.includes(isAuth) && item.role.includes(role))) return false;
                  if (item.subMenu) {
                        item.subMenu = filterNavItemsByRoleAndAuthStatus(item.subMenu, role, isAuth)
                  }
                  return true;
            })
      }



      const renderUserNavLinks = () => {
            const userNavItems = filterNavItemsByRoleAndAuthStatus(navItems, role, isAuth);

            const userNavLinks = userNavItems.map(item => (
                  <NavigationItem
                        key={item.id}
                        link={item.link || ''}
                        subMenu={item.subMenu || []}
                        closeMobileNav={closeMobileNav}
                  >
                        {item.text}
                  </NavigationItem>
            ));

            return userNavLinks;
      }

      const getMenuClasses = () => {
            let menuClasses = [styles['menu']];
            if (isMobileNavOpen) {
                  menuClasses = [styles['menu'], styles['menu--open-mobile']]
            }
            return menuClasses.join(' ');
      }

      return (
            <div className={getMenuClasses()}>
                  <div className={styles['menu__heading-mobile']}>
                        <div className={styles['logo']}>
                              <h1 className={styles['logo__text']}>Codevo</h1>
                        </div>
                        <div className={styles['close-icon']} onClick={closeMobileNav}>
                              <i className="bx bx-x"></i>
                        </div>
                  </div>
                  <ul className={styles['nav__list']}>
                        {renderUserNavLinks()}
                  </ul>
            </div>
      )
}

export default NavigationItems;