import React from 'react';
import { Link } from 'react-router-dom';

import ButtonLink from '../ButtonLink/ButtonLink';
import Price from '../Price/Price';

import image1 from '../../images/Products/Kites/OrbitBigAirFreeride/orbit_view.png'

import styles from './Product.module.scss'

const defaultProduct = {
      image: image1,
      name: 'Latawiec Orbit',
      brand: ' The North Kiteboarding',
      price: 5000,
      id: 1
}

const Product = ({ productImage = defaultProduct.image, productName = defaultProduct.name, productPrice = defaultProduct.price, sale = 0, id = defaultProduct.id, productBrand = defaultProduct.brand }) => {
      return (
            <div className={styles['product']}>
                  <div className={styles['product__header']}>
                        <img className={styles['product__image']} src={productImage.url} alt={productImage.name} />
                        <ul className={styles['icons']}>
                              <span className={styles['icon__container']}><i className="bx bx-heart"></i></span>
                              <span className={styles['icon__container']}><i className="bx bx-shopping-bag"></i></span>
                              <span className={styles['icon__container']}><i className="bx bx-search"></i></span>
                        </ul>
                  </div>
                  <div className={styles['product__footer']}>
                        {/* <Link to="/" className={styles['product__link']}> */}
                              <div>
                                    <p className={styles['product__name']}>{productName}</p>
                                    <p className={styles['product__brand']}>{productBrand}</p>
                              </div>
                        {/* </Link> */}
                        <div className={styles['rating']}>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                              <i className="bx bxs-star"></i>
                        </div>
                        {/* <p className={styles['product__price']}>100,00 z??</p> */}
                        {/* <p className={styles['product__price']}>Explore</p> */}
                        <Price sale={sale} price={productPrice} />
                        <ButtonLink linkPath={`/product/${id}`}>Explore</ButtonLink>
                  </div>
            </div>
      )
}

export default Product;