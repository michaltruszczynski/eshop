import React from 'react';

import Button from '../../components/Button/Button';
import RecomendedProducts from '../../components/RecomendedProducts/RecomendedProducts';

import Slider from '../../components/Carousel/Slider';

import styles from './Product.module.scss';

import image from '../../images/Products/Kites/PulseFreestyleWakestyle/2-102263_a3e917ffb857fa86039d2b9890c15a5708c5f423.png'

const imagesContext = require.context('../../images/Products/Kites/OrbitBigAirFreeride', true, /^\.\/.*\.png$/)

const imagesArray = ['orbit_view', 'orbit_top', 'orbit_bottom', 'orbit_side', 'orbit_front']


const product = {
      name: 'Latawiec Orbit',
      type: 'kite',
      brand: "The North Kiteboarding",
      price: 5000,
      sale: null,
      size: [{ size: 13, quantity: 10 }],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus molestiae repudiandae tempore aspernatur deleniti asperiores doloremque dignissimos fugit omnis dolorum?'

}

const Product = () => {
      return (
            <>
                  <div className={styles['section']}>
                        <div className={styles['section__container']}>
                              <div className={styles['product']}>
                                    {/* <div className={styles['product__images']}> */}
                                          {/* <img className={styles['product__image']} src={image} /> */}
                                          <Slider autoPlay={false} controls={true} imagesArray={imagesArray} imagesContext={imagesContext} imagesMaxNumber={1} />
                                    {/* </div> */}
                                    <div className={styles['product__data']}>
                                          <span className={styles['nav-path']}>Home / Kites</span>
                                          <h1 className={styles['product__name']}>Kite Orbit</h1>
                                          <h2 className={styles['product__type']}>Big Air/Freeride</h2>
                                          <div className={styles['product__price']}>4 000 zł</div>
                                          <form className={styles['form-size']}>
                                                <div className={styles['select']}>
                                                      <select className={styles['select__input']}>
                                                            <option value="Select Size">Select Size</option>
                                                            <option value="32">32</option>
                                                            <option value="42">42</option>
                                                            <option value="52">52</option>
                                                            <option value="62">62</option>
                                                      </select>
                                                      <span className={styles['select__icon']}>
                                                            <i className="bx bx-chevron-down"></i>
                                                      </span>
                                                </div>
                                          </form>
                                          <form className={styles['form-quantity']}>
                                                <input className={styles['number__input']} placeholder="1" type="text" readOnly />
                                                <Button>Add to Cart</Button>
                                          </form>
                                          <h3 className={styles['product__details']}>Product Details</h3>
                                          <p className={styles['product__description']}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus molestiae repudiandae tempore aspernatur deleniti asperiores doloremque dignissimos fugit omnis dolorum?</p>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <RecomendedProducts />
            </>


      )
}

export default Product;