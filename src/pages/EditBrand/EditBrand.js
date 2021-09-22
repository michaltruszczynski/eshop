import React from 'react';

import EditBrandForm from '../../components/EditBrandForm/EditBrandForm';

import styles from './EditBrand.module.scss';

const EditBrand = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Brand</h1>
                        </div>
                        <div>
                              <EditBrandForm />
                        </div>
                  </div>
            </section>
      )
}

export default EditBrand;