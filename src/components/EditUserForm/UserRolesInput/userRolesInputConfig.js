export const userRolesInputConfig = {
      userRoles: {
            elementName: 'Role',
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
                  validators: [],
                  addClassName: []
            }
      }
}