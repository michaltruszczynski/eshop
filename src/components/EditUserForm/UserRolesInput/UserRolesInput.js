import React from 'react';

import InputField from '../../Form/InputField/InputField';

import { userRolesInputConfig} from './userRolesInputConfig';

const UserRolesInput = ({ userRolesData, userRolesDataChangeHandler, disabled }) => {

      const userRolesInput = Object.values(userRolesInputConfig).map(formElement => (
            <InputField
                  key={formElement.elementName}
                  label={formElement.elementName}
                  elementType={formElement.elementType}
                  elementConfig={formElement.elementConfig}
                  value={userRolesData[formElement.elementConfig.name].value}
                  touched={userRolesData[formElement.elementConfig.name].touched}
                  isValid={userRolesData[formElement.elementConfig.name].isValid}
                  errors={userRolesData[formElement.elementConfig.name].errors}
                  onInputChange={userRolesDataChangeHandler(formElement.elementConfig.name)}
                  disabled={disabled}
                  editable={formElement.elementConfig.editable}
            />
      ));

      return (userRolesInput)
}

export default UserRolesInput;