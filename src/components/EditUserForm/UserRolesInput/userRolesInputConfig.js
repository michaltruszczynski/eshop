import { isArrayNotEmpty } from '../../../utility/validators';

export const userRolesInputConfig = {
      userRoles: {
            elementName: 'User role',
            elementType: 'checkbox',
            elementConfig: {
                  type: 'checkbox',
                  name: 'userRoles',
                  id: 'userRoles',
                  defaultValue: '',
                  options: [
                        { name: 'client', displayValue: 'Client' },
                        { name: 'employee', displayValue: 'Employee' },
                        { name: 'admin', displayValue: 'Administrator' }
                  ],
                  placeholder: 'Select user roles.',
                  validators: [
                        { check: isArrayNotEmpty, message: 'User must have at least one defined role.' }
                  ],
                  addClassName: []
            }
      }
}