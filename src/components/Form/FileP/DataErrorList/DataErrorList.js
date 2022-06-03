import React from 'react';
import InputError from '../../InpurtError/InputError';

import styles from './DataErrorList.module.scss';

const DataErrorList = ({ imageData, primaryImageData }) => {
      const { touched: imageDataTouched, isValid: imageDataIsValid, errors: imageDataErrors } = imageData;
      const { touched: primaryImageTouched, isValid: primaryImageIsValid, errors: primaryImageErrors } = primaryImageData;

      return (
            <div className={styles['field__error']}>
                  {(!imageDataIsValid && imageDataTouched) ? (
                        <InputError
                              touched={imageDataTouched}
                              isValid={imageDataIsValid}
                              errors={imageDataErrors} />
                  ) : null}
                  {(!primaryImageIsValid && primaryImageTouched) ? (
                        <InputError
                              touched={primaryImageTouched}
                              isValid={primaryImageIsValid}
                              errors={primaryImageErrors} />
                  ) : null}
            </div>
      )
}

export default DataErrorList;

