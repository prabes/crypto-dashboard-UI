import React, { ReactNode } from 'react'
import { Pagination, ProgressBar } from 'react-bootstrap';
import DataTable from 'react-data-table-component'

interface ITableData {
	id: number
	name: string
	price: number
	percentage_24: number
	percentage_7d: number
	market_cap: number
	volume_24h: number
	circulating_supply: number
}

interface IColumns {
	name: string
	sortable: boolean
	cell: Element
	maxWidth: string
	minWidth: string
}

interface TableProps {
	columns: IColumns[]
	data: ITableData[]
	onChangePage: () => {}
	paginationTotalRows: number
	paginationServer: boolean
	pagination: boolean
	onChangeRowsPerPage: () => {}
}


const Table: React.FunctionComponent<TableProps> = ({ columns, data, onChangePage, paginationTotalRows, paginationServer, pagination, onChangeRowsPerPage }) => {
	return (
		<div className='text-uppercase'>
			<DataTable title="Crypto Dashboard" columns={columns} data={data} pagination={pagination}
				paginationTotalRows={paginationTotalRows}
				onChangePage={onChangePage}
				paginationServer={paginationServer}
				onChangeRowsPerPage={onChangeRowsPerPage}
			/>
		</div>
	)
}

export default Table