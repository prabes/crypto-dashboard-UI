import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import DataTable from 'react-data-table-component'


interface Props { }
const columns = [
	{
		name: '#',
		sortable: true,
		cell: row => <div className='text-bold text-xsm primary-passive'>{row.id}</div>,
		maxWidth: '40px',
		minWidth: '40px'
	},
	{
		name: 'Name',
		sortable: true,
		cell: row => <div className='name d-flex justify-content-start align-items-center'>
			<img src="https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png" className='img' height="25" />
			<div className='text-bold px-2'>{row.name}</div>
			<div className="primary-passive">BTC</div>
		</div>,
		minWidth: '200px'
	},
	{
		name: 'Price',
		sortable: true,
		cell: row => <div className='text-sm text-bold'>{row.price}</div>
	},
	{
		name: '24 %',
		sortable: true,
		cell: row => <div className={`text-bold text-sm ${parseFloat(row.percentage_24) > 0 ? 'text-success' : 'text-danger'}`}>{row.percentage_24}</div>,
		maxWidth: '100px'
	},
	{
		name: '7d %',
		sortable: true,
		cell: row => <div className={`text-bold text-sm ${parseFloat(row.percentage_7d) > 0 ? 'text-success' : 'text-danger'}`}>{row.percentage_7d}</div>,
		maxWidth: '100px'
	},
	{
		name: 'Market Cap',
		selector: row => row.market_cap,
		sortable: true,
		cell: row => <div className='text-sm text-sbold'>{row.market_cap}</div>
	},
	{
		name: 'Volume(24h)',
		sortable: true,
		cell: row => <div className='text-sm text-sbold'>${row.volume_24h}</div>
	},
	{
		name: 'Circulating Supply',
		minWidth: '170px',
		sortable: true,
		cell: row => <div className='text-sm text-bold'>
			<span>
				{row.circulating_supply}
			</span>
			<div className='mt-2'>
				<ProgressBar now={60} />
			</div>
		</div>
	},
];


const data = [
	{
		id: 1,
		name: 'Movie 1',
		price: '$2,563',
		year: 'Dami year',
		percentage_24: '6.22%',
		percentage_7d: '13.76%',
		market_cap: '87,643,587,634',
		volume_24h: '4,573,872,364',
		circulating_supply: '32,323,243,454'
	},
	{
		id: 2,
		name: 'Movie 1',
		price: '$798',
		year: 'Dami year',
		percentage_24: '-6.22%',
		percentage_7d: '13.76%',
		market_cap: '87,643,587,634',
		volume_24h: '4,573,872,364',
		circulating_supply: '32,323,243,454'
	},
	{
		id: 3,
		name: 'Movie 1',
		price: '$35',
		year: 'Dami year',
		percentage_24: '6.22%',
		percentage_7d: '-13.76%',
		market_cap: '87,643,587,634',
		volume_24h: '4,573,872,364',
		circulating_supply: '32,323,243,454'
	},
	{
		id: 4,
		name: 'Movie 1',
		price: '$98',
		year: 'Dami year',
		percentage_24: '-6.22%',
		percentage_7d: '-13.76%',
		market_cap: '87,643,587,634',
		volume_24h: '4,573,872,364',
		circulating_supply: '32,323,243,454'
	},
]


const Table: React.FunctionComponent<Props> = ({ }) => (
	<div className='text-uppercase'>
		<DataTable title="Crypto Dashboard" columns={columns} data={data} pagination />
	</div>
)

export default Table