import React from 'react';

import Table from '../Table/Table';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useFetch from '../../hooks/useFetch';

const BrandListTable = () => {
      const [state] = useFetch('/admin/brands');

      console.log(state);
      const { status } = state;

      // tableData = [ {_id: 12345, colVal_1, colVal_2, colVal_3, ...}, {...}]

      const brandListTableColumnsHeadings = ['#', 'Name'];

      const brandTableOptions = [{
            type: 'link',
            linkName: 'View',
            url: '/admin/editbrand/'
      }];

      const getBrandTableData = () => {
            return state.data?.brands ? state.data?.brands : []
      }

      const emptyBrandTableMessage = 'No brands have been defined yet.';

      return (
            <AsyncOpBgComponent status={status}>
                  <Table
                        tableData={getBrandTableData()}
                        state={state}
                        columnsHeading={brandListTableColumnsHeadings}
                        optionsColumn={brandTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptyBrandTableMessage}
                        />
            </AsyncOpBgComponent>
      );
}

export default BrandListTable