import React from 'react';

import EditSizeChartForm from '../../components/EditSizeChartForm/EditSizeChartForm';

import styles from './EditSizeChartSystem.module.scss';

const EditSizeChartSystem = () => {

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Size Chart System</h1>
                        </div>
                        <div>
                              <EditSizeChartForm />
                        </div>
                  </div>
            </section>
      )
}

export default EditSizeChartSystem;