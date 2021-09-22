import React from 'react';

import styles from './Slide.module.scss';

const Slide = ({ content, width }) => {
      const slideImage = {
            backgroundImage: `url(${content.default})`,
            maxWidth: `${width}px`
      }

      return (
            <div className={styles['slide']} style={{width: `${width}px`}}>
                  {/* <div className={styles['slide__container']} style={slideImage}>

                  </div> */}
                  <img className={styles['product__image']} src={content.default} />
            </div>

      )
}

export default Slide;