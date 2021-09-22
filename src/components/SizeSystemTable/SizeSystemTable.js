import React from 'react';

import Table from '../Table/Table';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useFetch from '../../hooks/useFetch';

const SizeSystemTable = () => {
      const [state] = useFetch('/admin/sizesystems');
      const { status } = state;

      // const {sizeSystems: list} = sizeSystemList
      console.log(state);

      // tableData = [ {_id: 12345, colVal_1, colVal_2, colVal_3, ...}, {...}]

      const sizeSystemsTableColumnsHeadings = ['#', 'Name'];

      const sizeSystemTableOptions = {
            type: 'link',
            linkName: 'View',
            url: 'editsizesystem/'
      }

      const getSizeSystemTableData = () => {
            return state.data?.sizeSystems ? state.data?.sizeSystems : []
      }

      const emptySizeSystemTableMessage = 'No size systems have been defined yet. '

      return (
            <AsyncOpBgComponent status={status}>
                  <Table
                        tableData={getSizeSystemTableData()}
                        state={state}
                        columnsHeading={sizeSystemsTableColumnsHeadings}
                        optionsColumn={sizeSystemTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptySizeSystemTableMessage} />
            </AsyncOpBgComponent>
      )
}

export default SizeSystemTable