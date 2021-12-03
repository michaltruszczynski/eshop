import { length, email, containNumber, containSpecialChar, containCapitalLetter } from '../../../utility/validators';

export const passwordInputConfig = {
      password: {
            elementName: 'Password',
            elementType: 'inputText',
            elementConfig: {
                  type: 'password',
                  name: 'password',
                  id: 'password',
                  defaultValue: '',
                  placeholder: 'Enter password.',
                  validators: [
                        { check: length({min: 5, max: 8}), message: 'Brand name must be 5 - 10 characters long.' },
                        {},
                        {}
                  ],
                  addClassName: []
            }
      }
}