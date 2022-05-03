import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

interface Props {
  title?: string
  children?: JSX.Element
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div className="container p-5">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
)

export default Layout