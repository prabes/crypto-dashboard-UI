import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useEffect } from "react"
import { ProgressBar } from 'react-bootstrap';

import Layout from '../components/Layout'
import Table from '../components/Table'
import dashboardStore from '../store/dashboardStore'

const Dashboard = (props) => {
  useEffect(() => {
    getApiData()
  }, [])

  const getApiData = () => {
    const pageNumber = dashboardStore.pageNumber
    const searchQuery = dashboardStore.searchQuery
    const perPage = dashboardStore.perPage
    const urlParams = { pageNumber, perPage, searchQuery }
    dashboardStore.getCryptoList(urlParams)
  }

  const handlePageChange = (page) => {
    dashboardStore.pageNumber = page;
    getApiData()
  }

  const handlePerPageChange = (newPerPage) => {
    dashboardStore.perPage = newPerPage;
    getApiData()
  }

  const tableColumn =
    [
      {
        name: '#',
        sortable: true,
        cell: row => <div className='text-bold text-xsm primary-passive table-row'> {row.id} </div>,
        maxWidth: '80px',
        minWidth: '80px',
        id: 'sn'
      },
      {
        name: 'Name',
        sortable: true,
        cell: row => <div className='name d-flex justify-content-end align-items-center mx-3' >
          <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png" className='img' height="25" />
          <div className='text-bold px-2' > {row.name} </div>
          <div className="primary-passive" >{row.symbol}</div>
        </div>,
        minWidth: '300px',
        id: 'name'
      },
      {
        name: 'Price',
        sortable: true,
        cell: row => <div className='text-sm text-bold' > {row.price.toFixed(3)} </div>,
        id: 'price'

      },
      {
        name: '24 %',
        sortable: true,
        cell: row => <div className={`text-bold text-sm ${parseFloat(row.percentage_24) > 0 ? 'text-success' : 'text-danger'}`}> {row.percentage_24.toFixed(2)}% </div>,
        maxWidth: '100px',
        id: '24_per'
      },
      {
        name: '7d %',
        sortable: true,
        cell: row => <div className={`text-bold text-sm ${parseFloat(row.percentage_7d) > 0 ? 'text-success' : 'text-danger'}`}> {row.percentage_7d.toFixed(2)}% </div>,
        maxWidth: '100px',
        id: '7d_per'
      },
      {
        name: 'Market Cap',
        selector: row => row.market_cap,
        sortable: true,
        cell: row => <div className='text-sm text-bold' > ${row.market_cap.toFixed(2)} </div>,
        id: 'market_cap',
        minWidth: '130px'
      },
      {
        name: 'Volume(24h)',
        sortable: true,
        cell: row => <div className='text-sm text-bold' > ${row.volume_24h.toFixed(2)} </div>,
        id: 'volume_24'
      },
      {
        name: 'Circulating Supply',
        minWidth: '190px',
        sortable: true,
        cell: row => <div className='text-sm text-bold' >
          <span>
            {row.circulating_supply.toFixed(4)}
          </span>
          < div className='mt-2' >
            {row.market_cap > 0 &&
              <ProgressBar now={row.circulating_supply / row.market_cap} />
            }
          </div>
        </div>,
        id: 'circulating_supply'

      },
    ]

  const getTableData = (dashboardStore) => {
    const { cryptoList } = toJS(dashboardStore)
    const tableData = cryptoList?.details?.map((row) => {
      return {
        id: row.coinId,
        name: row.name,
        price: row.price_usd,
        percentage_24: row.percentage_change_24h,
        percentage_7d: row.percentage_change_7d,
        market_cap: row.market_cap,
        volume_24h: row.volume_24hr,
        circulating_supply: row.circulating_supply
      }
    })
    return tableData
  }
  const { cryptoList } = toJS(dashboardStore)
  return (
    <>
      <Layout title="Crypto Dashboard">
        <Table columns={tableColumn} data={getTableData(dashboardStore)} pagination
          paginationServer
          paginationTotalRows={cryptoList.total}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerPageChange}
        />
      </Layout>
    </>
  )
}

export default (observer(Dashboard));
