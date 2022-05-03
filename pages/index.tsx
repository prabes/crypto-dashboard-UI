import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Table from '../components/Table'


export default function Home() {
  return (
    <>
      <Head>
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet"></link>
        </>
      </Head>
      <Layout title="Crypto Dashboard">
        <Table />
      </Layout>
    </>
  )
}