import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useEffect, useMemo } from "react"
import { Dropdown } from 'react-bootstrap'
import AppButton from '../components/Button'
import { ProgressBar } from 'react-bootstrap';

import Layout from '../components/Layout'
import { DropdownSelector } from '../components/Dropdown'
import Table from '../components/Table'
import dashboardStore from '../store/dashboardStore'
import { DashboardStore } from '../store/dashboardStore'

const Dashboard = (props) => {
  useEffect(() => {
    debugger
    const data = dashboardStore.getCryptoList()
  }, [])

  const tableColumn = useMemo(
    () =>
      [
        {
          name: '#',
          sortable: true,
          cell: row => <div className='text-bold text-xsm primary-passive' > {row.id} </div>,
          maxWidth: '60px',
          minWidth: '60px'
        },
        {
          name: 'Name',
          sortable: true,
          cell: row => <div className='name d-flex justify-content-start align-items-center' >
            <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png" className='img' height="25" />
            <div className='text-bold px-2' > {row.name} </div>
            < div className="primary-passive" > BTC </div>
          </div>,
          minWidth: '200px'
        },
        {
          name: 'Price',
          sortable: true,
          cell: row => <div className='text-sm text-bold' > {row.price} </div>
        },
        {
          name: '24 %',
          sortable: true,
          cell: row => <div className={`text-bold text-sm ${parseFloat(row.percentage_24) > 0 ? 'text-success' : 'text-danger'}`}> {row.percentage_24} </div>,
          maxWidth: '100px'
        },
        {
          name: '7d %',
          sortable: true,
          cell: row => <div className={`text-bold text-sm ${parseFloat(row.percentage_7d) > 0 ? 'text-success' : 'text-danger'}`}> {row.percentage_7d} </div>,
          maxWidth: '100px'
        },
        {
          name: 'Market Cap',
          selector: row => row.market_cap,
          sortable: true,
          cell: row => <div className='text-sm text-sbold' > {row.market_cap} </div>
        },
        {
          name: 'Volume(24h)',
          sortable: true,
          cell: row => <div className='text-sm text-sbold' > ${row.volume_24h} </div>
        },
        {
          name: 'Circulating Supply',
          minWidth: '170px',
          sortable: true,
          cell: row => <div className='text-sm text-bold' >
            <span>
              {row.circulating_supply}
            </span>
            < div className='mt-2' >
              <ProgressBar now={60} />
            </div>
          </div>
        },
      ], []
  )

  const getTableData = (dashboardStore) => {
    const { cryptoList } = toJS(dashboardStore)
    debugger
    const tableData = cryptoList.map((row) => {
      return {
        id: row.coinId,
        name: row.name,
        price: row.price_usd,
        percentage_24: row.percentage_change_24h,
        percentage_7d: row.percentage_change_7d,
        market_cap: row.market_cap,
        volume_24h: row.volume_24h,
        circulating_supply: row.circulating_supply
      }
    })
    return tableData
  }
  debugger
  return (
    <>
      <Layout title="Crypto Dashboard">
        <Table columns={tableColumn} data={getTableData(dashboardStore)} />
      </Layout>
    </>
  )
}

export default (observer(Dashboard));
