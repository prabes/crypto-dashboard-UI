import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import DataTable from 'react-data-table-component'
// import { tableColumn } from './tableConfig'


interface Props {
	columns: Array;
	data: Array
}


const Table: React.FunctionComponent<Props> = ({ columns, data }) => {
	debugger
	return (
	<div className='text-uppercase'>
		<DataTable title="Crypto Dashboard" columns={columns} data={data} pagination />
	</div>
)}

export default Table