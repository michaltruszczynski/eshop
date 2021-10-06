import { required } from '../../../utility/validators';

export const productBrandInputConfig = {
      productBrand: {
            elementName: 'Brand',
            elementType: 'select',
            elementConfig: {
                  name: 'productBrand',
                  id: 'productBrand',
                  defaultValue: '',
                  placeholder: 'Select brand.',
                  options: [
                  ],
                  validators: [
                        { check: required(), message: 'Please select product brand.' }
                  ],
                  addClassName: []
            }
      }
}