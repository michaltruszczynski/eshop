import React from 'react';

import styles from './SelectedImagesPreview.module.scss';

const SelectedImagesPreview = ({ imagesSelected, disabled, onDeleteImage }) => {

      if (!imagesSelected.length) return null;

      const removeFileHandler = (event, index) => {
            onDeleteImage(event, index);
      }

      const getIconClasses = () => {
            let iconClasses = [styles['delete-icon']];

            if (disabled) {
                  iconClasses.push(styles['delete-icon--disabled']);
            }

            return iconClasses.join(' ');
      }

      return imagesSelected.map((image, index) => (
            <div className={styles['image-container']} key={`image${index}`}>
                  <img src={image.url} className={styles['image']} alt={image.name} />
                  <div className={styles['icon-container']}>
                        <i
                              className={`bx bx-trash ${getIconClasses()}`}
                              onClick={(e) => removeFileHandler(e, index)} ></i>
                  </div>
            </div>
      ));
}

export default SelectedImagesPreview;