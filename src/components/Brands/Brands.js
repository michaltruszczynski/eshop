import React from 'react';

import styles from './Brands.module.scss';

import Slider from '../Carousel/Slider';

const imagesContext = require.context('../../images/Brands', true, /^\.\/.*\.png$/)

const imagesArray = ['cabrinha', 'dakine', 'flysurfer', '106', 'nobile', 'northkite', 'oneill', 'ozone']

const Brands = () => {
      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Our Brands</h1>
                        </div>
                        <div className={styles['brands-list']}>
                              <Slider autoPlay={false} controls={false} imagesArray={imagesArray} imagesContext={imagesContext} imagesMaxNumber={5} />
                        </div>
                  </div>
            </section>
      )
}

export default Brands;