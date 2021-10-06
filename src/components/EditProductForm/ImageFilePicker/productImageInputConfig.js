import {arrayLength} from '../../../utility/validators';

export const productImageInputConfig = {
      productImage: {
            elementName: 'Product images (select 3 - 5 images)',
            elementType: '',
            elementConfig: {
                  type: '',
                  name: 'fileList',
                  id: '',
                  defaultValue: [],
                  placeholder: '',
                  validators: [
                        { check: arrayLength({min: 1, max: 5}), message: 'Product must have 1 -5 images.' }
                  ],
                  addClassName: []
            }
      }
}