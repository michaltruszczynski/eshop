import React from 'react';

import ProductOffer from '../../components/ProductOffer/ProductOffer';

import styles from './Products.module.scss';

const Products = () => {

      return (
            <section className={styles['section']} >
                  <div className={styles['section__container']}>
                        <ProductOffer />
                  </div>
            </section>
      )
}

export default Products;