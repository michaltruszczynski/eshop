import { required, length } from '../../../utility/validators'

export const productDescriptionInputsConfig = {
      productCategory: {
            elementName: 'Product category',
            elementType: 'select',
            elementConfig: {
                  name: 'productCategory',
                  id: 'productCategory',
                  defaultValue: '',
                  placeholder: 'Select category.',
                  options: [
                        { value: 'Kites', displayValue: 'Kites' },
                        { value: 'Boards', displayValue: 'Boards' },
                        { value: 'Accesories', displayValue: 'Accessories' },
                        { value: 'Wetsiuts', displayValue: 'Wetsiuts' }
                  ],
                  validators: [
                        { check: required('empty'), message: 'Please choose product category.' },
                  ],
                  addClassName: []
            },
      },
      productName: {
            elementName: 'Product name',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'productName',
                  id: 'productName',
                  defaultValue: '',
                  placeholder: 'Enter product name.',
                  validators: [
                        // { check: length(), message: 'Product name must be 5 - 40 characters long.' }
                        { check: length({min: 5, max: 40}), message: 'Product name must be 5 - 40 characters long.' }
                  ],
                  addClassName: []
            }
      },
      productType: {
            elementName: 'Product type',
            elementType: 'inputText',
            elementConfig: {
                  type: 'text',
                  name: 'productType',
                  id: 'productType',
                  defaultValue: '',
                  placeholder: 'Enter product type.',
                  validators: [
                        // { check: length(), message: 'Product type must be 5 - 10 characters long.' }
                        { check: length({min: 5, max: 50}), message: 'Product type must be 5 - 50 characters long.' }
                  ],
                  addClassName: []
            }
      },
      description: {
            elementName: 'Description',
            elementType: 'textarea',
            elementConfig: {
                  name: 'description',
                  id: 'description',
                  defaultValue: '',
                  placeholder: 'Enter product description.',
                  validators: [
                        // { check: length(), message: 'Product description must be 5 - 10 characters long.' }
                        { check: length({min: 100, max: 800}), message: 'Product description must be 100 - 800 characters long.' }
                  ],
                  addClassName: []
            }
      }
}