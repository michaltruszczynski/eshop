import React from 'react';

import EditProductForm from '../../components/EditProductForm/EditProductForm';

import styles from './EditProduct.module.scss';

const EditProduct = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Product</h1>
                        </div>
                        <div>
                              <EditProductForm />
                        </div>
                  </div>
            </section>
      )
}

export default EditProduct;