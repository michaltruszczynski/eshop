import React from 'react';

import Table from '../Table/Table';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useFetch from '../../hooks/useFetch';

const capitalize = word => {
      const loweredCase = word.toLowerCase();
      return loweredCase.charAt(0).toUpperCase() + loweredCase.slice(1)
}

const UserListTable = () => {
      const [state] = useFetch('/admin/users');
      const { status, error } = state;
      console.log(status)

      // tableData = [ {_id: 12345, colVal_1, colVal_2, colVal_3, ...}, {...}]

      const userTableColumnsHeadings = ['#', 'Name', 'Email', 'Role'];

      const userTableOptions = {
            type: 'link',
            linkName: 'View',
            url: '/admin/edituser/'
      }

      console.log('[UserListTable], rendering', state)

      const getUserTableData = () => {
            if (!state.data?.users) return [];

            return state.data.users.map(user => {
                  const userRole = user.userRoles.map(role => {
                        return capitalize(role.name);
                  }).sort().join('')

                  return {
                        _id: user._id,
                        userName: user.name,
                        userEmail: user.email,
                        userRoles: userRole
                  }
            });
      }

      const emptySizeSystemTableMessage = 'No users found. '

      return (
            <AsyncOpBgComponent status={status} error={error}>
                  <Table
                        tableData={getUserTableData()}
                        state={state}
                        columnsHeading={userTableColumnsHeadings}
                        optionsColumn={userTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptySizeSystemTableMessage} />
            </AsyncOpBgComponent>
      )
}

export default UserListTable