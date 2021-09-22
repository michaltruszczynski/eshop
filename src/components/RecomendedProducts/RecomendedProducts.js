import React from 'react';
import Product from '../Product/Product';

import styles from './RecomendedProducts.module.scss';

const RecomendedProducts = () => {
      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Recomended Products</h1>
                        </div>
                        <div className={styles['product-list']}>
                              <Product />
                              <Product />
                              <Product />
                              <Product />
                        </div>
                  </div>
            </section>
      )
}

export default RecomendedProducts;